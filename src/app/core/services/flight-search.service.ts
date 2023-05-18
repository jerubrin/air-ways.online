import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlightSearch } from 'src/app/shared/interfaces/flight-search.model';
import { Flight } from 'src/app/booking/models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  private flightSearchParamsSubject = new BehaviorSubject<FlightSearch>({
    fromKey: '',
    toKey: '',
    forwardDate: '',
    backDate: '',
    adults: 1,
    children: 0,
    infants: 0
  });

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

  updateFlightSearchParams(searchParams: FlightSearch): void {
    this.flightSearchParamsSubject.next(searchParams);
  }

  getFlightSearchParams(): Observable<FlightSearch> {
    return this.flightSearchParamsSubject.asObservable();
  }

  updateFormState(isValid: boolean): void {
    this.formValid = isValid;
  }

  isFormValid(): boolean {
    return this.formValid;
  }
}
