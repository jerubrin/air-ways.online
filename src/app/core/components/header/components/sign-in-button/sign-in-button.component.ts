import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.scss'],
})
export class SignInButtonComponent {
  constructor(public authService: AuthService) {}

  click() {
    if (this.authService.token) {
      this.authService.logout();
    } else {
      this.authService.showAuthModal();
    }
  }
}
