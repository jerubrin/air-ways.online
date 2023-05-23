import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSignup } from '../interfaces/user-signup.model';
import { API_URL, API_REGISTRATION } from '../data/uri/api-url.constants';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  isAuthModalVisible = false;

  constructor(private http: HttpClient) {}

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  signUp(user: UserSignup) {
    this.http.post<User>(`${API_URL}${API_REGISTRATION}`, user);
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
