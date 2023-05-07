import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { FlightsService } from '../services/flights.service';

@Injectable({
  providedIn: 'root'
})
export class FlightFormGuard implements CanActivate {
  constructor(private flightsService: FlightsService, private router: Router) {}

  canActivate(): boolean {
    const isFormValid = this.flightsService.isFormValid();
    if (!isFormValid) {
      this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageFlights}`]);
    }
    return isFormValid;
  }
}
