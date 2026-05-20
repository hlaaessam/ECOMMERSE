import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import {
  RxReactiveFormsModule,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgClass,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  registerSub!: Subscription;
  msgError: string = '';
  isLoading: boolean = false;
  isSuccess: boolean = false;
  // another way to create form using form builder

  private readonly _FormBuilder = inject(FormBuilder);

  // dataForm = {
  //   name: 'john',
  //   email: 'email@gmail.com',
  //   password: '123456',
  //   rePassword: '123456',
  //   phone: '01012345678',
  // };

  ngOnInit(): void {
    // we have two ways to set value for form one is setValue and the other is patchValue
    //  the difference between them is that setValue requires all the form controls to be specified
    // while patchValue allows you to specify only the form controls that you want to update
    // this.registerForm.patchValue({
    //   name: this.dataForm.name,
    //   email: this.dataForm.email,
    //   password: this.dataForm.password,
    //   rePassword: this.dataForm.rePassword,
    //   phone: this.dataForm.phone,
    // });
  }
  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: [this.confirmPasswordValidator] },
  );

  // form using RxwebValidators but do not forget to handle errors in html
  // registerForm: FormGroup = this._FormBuilder.group({
  //   name: [
  //     '',
  //     [
  //       RxwebValidators.required(),
  //       RxwebValidators.minLength({ value: 3 }),
  //       RxwebValidators.maxLength({ value: 20 }),
  //     ],
  //   ],
  //   email: ['', [RxwebValidators.required(), RxwebValidators.email()]],
  //   password: [
  //     '',
  //     [
  //       RxwebValidators.required(),
  //       RxwebValidators.pattern({ expression: { onlyAlpha: /^\w{6,}$/ } }),
  //     ],
  //   ],
  //   rePassword: ['', RxwebValidators.compare({ fieldName: 'password' })],
  //   phone: [
  //     '',
  //     [
  //       RxwebValidators.required(),
  //       RxwebValidators.pattern({
  //         expression: { onlyAlpha: /^01[0125][0-9]{8}$/ },
  //       }),
  //     ],
  //   ],
  // });
  // form using formgroup
  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     rePassword: new FormControl(null),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   this.confirmPasswordValidator,
  // );

  confirmPasswordValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    if (!rePassword) return null;

    return rePassword === password ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this.registerSub = this._AuthService
        .Registeration(this.registerForm.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.message == 'success') {
              this.isSuccess = true;
              setTimeout(() => {
                this._Router.navigate(['/login']);
              }, 1000);
            }
          },
          error: (err) => {
            // this.msgError = err.error.message;
            this.isLoading = false;
          },
        });
    } else {
      // this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }
}
