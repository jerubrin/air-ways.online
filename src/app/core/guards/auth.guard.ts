import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isAuthenticated();

    if (isLoggedIn) {
      return true;
    }

    const snackBarRef = this.snackBar.open('Please log in', 'OK', { verticalPosition: 'top' });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate([RoutesPath.MainPage]);
    });

    return false;
  }
}
