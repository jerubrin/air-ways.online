import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { FlightSearchService } from 'src/app/core/services/flight-search.service';

@Injectable({
  providedIn: 'root'
})
export class FlightFormGuard implements CanActivate {
  constructor(private flightSearchService: FlightSearchService, private router: Router) {}

  canActivate(): boolean {
    const isFormValid = this.flightSearchService.isValid;

    if (!isFormValid) {
      this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageFlights}`]);
    }
    return isFormValid;
  }
}
