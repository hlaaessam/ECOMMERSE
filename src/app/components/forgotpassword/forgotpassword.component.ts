import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  step: number = 1;
  isLoading: boolean = false;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required]],
  });

  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  verifyEmailSubmit(): void {
    if (this.verifyEmail.valid) {
      let email = this.verifyEmail?.get('email')?.value;
      this.resetPassword.get('email')?.setValue(email); // put email in reset password form
      this.isLoading = true;
      this._AuthService.setEmailVerification(this.verifyEmail.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.statusMsg === 'success') {
            this.step = 2;
          }
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
    } else {
      this.verifyEmail.setErrors({ mismatch: true });
      this.verifyEmail.markAllAsTouched();
      this.isLoading = false;
    }
  }

  verifyCodeSubmit(): void {
    if (this.verifyCode.valid) {
      this.isLoading = true;
      this._AuthService.setCodeVerification(this.verifyCode.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.statusMsg === 'Success') {
            this.step = 3;
          }
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
    } else {
      this.verifyCode.setErrors({ mismatch: true });
      this.verifyCode.markAllAsTouched();
      this.isLoading = false;
    }
  }

  resetPasswordSubmit(): void {
    if (this.resetPassword.valid) {
      this.isLoading = true;
      this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          localStorage.setItem('userToken', res.token);
          this._AuthService.saveUserData();
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
    } else {
      this.resetPassword.setErrors({ mismatch: true });
      this.resetPassword.markAllAsTouched();
      this.isLoading = false;
    }
  }
}
