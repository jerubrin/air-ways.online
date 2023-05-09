import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { FlightSearchService } from '../services/flight-search.service';

@Injectable({
  providedIn: 'root'
})
export class FlightsSearchFormGuard implements CanActivate {
  constructor(private flightSearchService: FlightSearchService, private router: Router) {}

  canActivate(): boolean {
    const isFormValid = this.flightSearchService.isFormValid();

    if (!isFormValid) {
      this.router.navigate([RoutesPath.MainPage]);
    }

    return isFormValid;
  }
}
