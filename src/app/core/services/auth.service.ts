/* eslint-disable no-underscore-dangle */
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, catchError, throwError } from 'rxjs';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { LocalStorageKeys } from '../data/enams/local-storage.enum';
import { API_CHECK_JWT, API_LOGIN, API_REGISTRATION, API_URL } from '../data/uri/api-url.constants';
import { CustomLoginProvider } from '../helpers/custom-provider';
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

  private _isOauth = false;

  private _userName$ = new ReplaySubject<string | null>(1);

  private _userPicture$ = new ReplaySubject<string | null>(1);

  private provider = '';

  userData?: UserResponse;

  isLoggedIn = false;

  isAuthModalVisible = false;

  authActionValue: AuthAction = AuthAction.Login;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this._isOauth = !!localStorage.getItem(LocalStorageKeys.IsOauth);
    const lsUserData =
      localStorage.getItem(LocalStorageKeys.UserData);
    const userName = localStorage.getItem(LocalStorageKeys.UserName);
    this._userName$.next(userName || null);

    if (lsUserData) {
      this.userData = JSON.parse(lsUserData);
      this._token = localStorage.getItem(LocalStorageKeys.Token);
    }

    // google facebook
    this.refreshToken();
    this.socialAuthService.authState.subscribe(this.authUser.bind(this));
  }

  authUser(user: SocialUser) {
    if (!user) return;
    const { provider, idToken, authToken, email, name, firstName, lastName, photoUrl } = user;
    this.provider = provider; // "GOOGLE" | "FACEBOOK"
    this.userData = { email, firstName, lastName, photoUrl };
    this._userName$.next(name || null);
    this._token = idToken ?? authToken;
    this._isOauth = true;
    localStorage.setItem(LocalStorageKeys.IsOauth, 'true');
    localStorage.setItem(LocalStorageKeys.Token, idToken);
    localStorage.setItem(LocalStorageKeys.UserData, JSON.stringify(this.userData));
    localStorage.setItem(LocalStorageKeys.UserName, name);
    localStorage.setItem(LocalStorageKeys.Provider, this.provider);
    this._userPicture$.next(photoUrl);
    this.hideModalWindow();
  }

  refreshToken(): void {
    if (this.provider === 'GOOGLE') {
      this.socialAuthService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
    }
    if (this.provider === 'FACEBOOK') {
      this.socialAuthService.refreshAccessToken(FacebookLoginProvider.PROVIDER_ID);
    }
  }

  get token(): string | null {
    return this._token;
  }

  get isOauth() { return this._isOauth; }

  get userName$(): Observable<string | null> {
    return this._userName$;
  }

  private setToken(token: string) {
    this.socialAuthService.signIn(CustomLoginProvider.PROVIDER_ID);
    localStorage.setItem(LocalStorageKeys.Token, token);
    localStorage.removeItem(LocalStorageKeys.Provider);
    this._token = token;
    localStorage.removeItem(LocalStorageKeys.IsOauth);
    this.me();
  }

  me() {
    this.http.get<UserResponse>(
      `${API_URL}/${API_CHECK_JWT}`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    ).pipe(
      catchError(() => {
        this.logout();
        return throwError(() => new Error('Error! User is not authorized!'));
      })
    ).subscribe((res) => {
      this.userData = res;
      const userName = `${res.firstName} ${res.lastName}`;
      this._userName$.next(userName);
      this._userPicture$.next(null);
      localStorage.setItem(LocalStorageKeys.UserName, userName);
      localStorage.setItem(LocalStorageKeys.UserData, JSON.stringify(res));
      this.hideModalWindow();
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
      .subscribe({
        next: (res) => {
          this.setToken(res.token);
          this.hideModalWindow();
        },
        error: () => {}
      });
  }

  logout(): void {
    if (this._isOauth) {
      this.socialAuthService.signOut();
    }
    this._token = null;
    this._userName$.next(null);
    this._userPicture$.next(null);
    this.userData = undefined;
    localStorage.removeItem(LocalStorageKeys.Token);
    localStorage.removeItem(LocalStorageKeys.UserName);
    localStorage.removeItem(LocalStorageKeys.UserData);
    localStorage.removeItem(LocalStorageKeys.Provider);

    if (!this.router.url.includes('flight') && !this.router.url.includes('main')) {
      this.router.navigate([RoutesPath.MainPage]);
    }
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
      .subscribe({
        next: (res) => {
          this.setToken(res.token);
          this.hideModalWindow();
        },
        error: () => {}
      });
  }

  hideModalWindow() {
    this.isAuthModalVisible = false;
    this.authActionValue = AuthAction.Login;
  }

  isAuthenticated(): boolean {
    return !!this._token;
  }

  showAuthModal(): void {
    if (this._token) {
      return;
    }
    this.isAuthModalVisible = true;
  }

  hideAuthModal(): void {
    this.isAuthModalVisible = false;
  }

  showError(message: string) {
    this.snackBar.open(message, 'OK');
  }
}
