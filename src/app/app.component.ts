import { Component } from '@angular/core';
import AuthAction from './core/interfaces/auth-action';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'air-ways.online';

  AuthAction = AuthAction;

  constructor(public readonly authService: AuthService) {}

  closeModal() {
    if (this.authService.isAuthModalVisible) {
      this.authService.hideAuthModal();
    }
  }
}
