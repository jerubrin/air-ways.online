import { Injectable } from '@angular/core';
import AuthAction from 'src/app/core/data/enams/AuthAction';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  isAuthModalVisible = false;

  authAction = AuthAction;

  authActionValue: AuthAction = this.authAction.Login;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  showAuthModal(): void {
    this.isAuthModalVisible = true;
  }

  hideAuthModal(): void {
    this.isAuthModalVisible = false;
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
}
