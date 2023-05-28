import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.scss'],
})
export class SignInButtonComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  click() {
    if (this.authService.token) {
      this.authService.logout();
    } else {
      this.authService.showAuthModal();
    }
  }

  goToProfile() {
    this.router.navigate([RoutesPath.UserAccountPage]);
  }
}
