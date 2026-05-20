import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/enviroment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  Registeration(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data,
    );
  }

  setLoginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data,
    );
  }

  userData: any = null;
  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      // decode token to get user data
      // ! to tell typescript that this value will not be null
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    // if there an api to remove token from backend we will call it here
    //  navigate to login page
    this._Router.navigate(['/login']);
  }

  setEmailVerification(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
      data,
    );
  }
  setCodeVerification(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      data,
    );
  }

  setResetPassword(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/resetPassword}`,
      data,
    );
  }
}
