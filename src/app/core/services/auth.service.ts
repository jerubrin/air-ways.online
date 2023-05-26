/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ReplaySubject, catchError, throwError } from 'rxjs';
import { LocalStorageKeys } from '../data/enams/local-storage.enum';
import { API_CHECK_JWT, API_LOGIN, API_REGISTRATION, API_URL } from '../data/uri/api-url.constants';
import AuthAction from '../interfaces/auth-action';
import { LoginRequest } from '../models/login.model';
import { SignUpRequest } from '../models/sign-up.model';
import { TokenResponse } from '../models/token.model';
import { UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string | null = null;

  private _userName$ = new ReplaySubject<string | null>(1);

  userData?: UserResponse;

  isLoggedIn = false;

  isAuthModalVisible = false;

  authActionValue: AuthAction = AuthAction.Login;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
    this._token = localStorage.getItem(LocalStorageKeys.Token);
    const userName = localStorage.getItem(LocalStorageKeys.UserName);
    const lsUserData = localStorage.getItem(LocalStorageKeys.UserData);
    if (lsUserData) {
      this.userData = JSON.parse(lsUserData);
    }
    this._userName$.next(userName);
  }

  get token(): string | null {
    return this._token;
  }

  get userName$(): Observable<string | null> {
    return this._userName$;
  }

  private setToken(token: string) {
    localStorage.setItem(LocalStorageKeys.Token, token);
    this._token = token;
    this.me();
  }

  me() {
    this.http.get<UserResponse>(`${API_URL}/${API_CHECK_JWT}`, { headers: { Authorization: `Bearer ${this.token}` } })
      .pipe(
        catchError(() => {
          this.logout();
          return throwError(() => new Error('Error! User is not authorized!'));
        })
      )
      .subscribe((res) => {
        this.userData = res;
        const userName = `${res.firstName} ${res.lastName}`;
        this._userName$.next(userName);
        localStorage.setItem(LocalStorageKeys.UserName, userName);
        localStorage.setItem(LocalStorageKeys.UserData, JSON.stringify(res));
      });
  }

  login(loginReq: LoginRequest): void {
    this.http.post<TokenResponse>(`${API_URL}/${API_LOGIN}`, loginReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 403: this.showError('Error: Wrong password!'); break;
            case 404: this.showError('Error: User not found!'); break;
            default: this.showError('Error: Something went wrong!');
          }
          return throwError(() => new Error('Error! Can not login!'));
        })
      )
      .subscribe((res) => {
        this.setToken(res.token);
        this.isAuthModalVisible = false;
      });
  }

  logout(): void {
    this._token = null;
    this._userName$.next(null);
    localStorage.removeItem(LocalStorageKeys.Token);
    localStorage.removeItem(LocalStorageKeys.UserName);
    localStorage.removeItem(LocalStorageKeys.UserData);
  }

  signUp(signUpReq: SignUpRequest) {
    this.http.post<TokenResponse>(`${API_URL}/${API_REGISTRATION}`, signUpReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 400: this.showError(error.error.message); break;
            default: this.showError('Error: Something went wrong!');
          }
          return throwError(() => new Error('Error! Can not create new user!'));
        })
      )
      .subscribe((res) => {
        this.setToken(res.token);
        this.isAuthModalVisible = false;
        this.authActionValue = AuthAction.Login;
      });
  }

  isAuthenticated(): boolean {
    return !!this._token;
  }

  showAuthModal(): void {
    this.isAuthModalVisible = true;
  }

  hideAuthModal(): void {
    this.isAuthModalVisible = false;
  }

  showError(message: string) {
    this.snackBar.open(message, 'OK');
  }
}
