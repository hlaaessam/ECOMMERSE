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
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgClass,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  loginSub!: Subscription;

  msgError: string = '';
  isLoading: boolean = false;
  isSuccess: boolean = false;

  //  using form builder
  private readonly _FormBuilder = inject(FormBuilder);

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  onSubmit(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this.loginSub = this._AuthService
        .setLoginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.message == 'success') {
              this.isSuccess = true;
              setTimeout(() => {
                localStorage.setItem('userToken', res.token);

                this._AuthService.saveUserData();
                this._Router.navigate(['/home']);
              }, 1000);
            }
          },
          error: (err) => {
            // this.msgError = err.error.message;
            this.isLoading = false;
          },
        });
    } else {
      this.loginForm.setErrors({ mismatch: true });
      this.loginForm.markAllAsTouched();
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
