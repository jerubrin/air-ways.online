import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { PassengersService } from '../services/passengers.service';

@Injectable({
  providedIn: 'root'
})
export class PassengersFormGuard implements CanActivate {
  constructor(private passengersService: PassengersService, private router: Router) {}

  canActivate(): boolean {
    const isFormValid = this.passengersService.isFormValid();
    if (!isFormValid) {
      this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPagePassengers}`]);
    }
    return isFormValid;
  }
}
