import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  isAuthModalVisible = false;

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
