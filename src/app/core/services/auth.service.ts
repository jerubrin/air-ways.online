import { Injectable } from '@angular/core';
import AuthAction from '../interfaces/auth-action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  isAuthModalVisible = false;

  authActionValue: AuthAction = AuthAction.Login;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  showAuthModal(): void {
    this.isAuthModalVisible = true;
  }

  hideAuthModal(): void {
    this.isAuthModalVisible = false;
  }
}
