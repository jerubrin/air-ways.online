import { Injectable } from '@angular/core';

import { Flight } from 'src/app/booking/models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  private formValid = true;

  selectedFlights = new Array<Flight | undefined>(2);

  selected: boolean[] = [false, false];

  hasBackDate?: boolean;

  get isValid(): boolean {
    return !!(this.hasBackDate
      ? this.selectedFlights[0] && this.selectedFlights[1]
      : !!this.selectedFlights[0]);
  }

  selectFlight(num: number, flight?: Flight) {
    this.selectedFlights[num] = flight;
    this.selected[num] = !!flight;
    this.updateFormState(this.isValid);
  }

  updateFormState(isValid: boolean): void {
    this.formValid = isValid;
  }

  isFormValid(): boolean {
    return this.formValid;
  }
}
