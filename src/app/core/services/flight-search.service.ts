import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlightSearch } from 'src/app/shared/interfaces/flight-search.model';

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
    infants: 0,
  });

  private formValid = false;

  updateFlightSearchParams(searchParams: FlightSearch): void {
    this.flightSearchParamsSubject.next(searchParams);
  }

  getFlightSearchParams(): Observable<FlightSearch> {
    return this.flightSearchParamsSubject.asObservable();
  }

  updateFormState(form: FormGroup): void {
    this.formValid = form.valid;
  }

  isFormValid(): boolean {
    return this.formValid;
  }
}
