import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, switchMap } from 'rxjs';
import { FlightSearch } from 'src/app/shared/interfaces/flight-search.model';
import { Flight } from 'src/app/booking/models/flight.model';
import { HttpClient } from '@angular/common/http';
import { QueryParamsService } from './query-params.service';
import { API_FLIGHT, API_URL } from '../data/uri/api-url.constants';

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

  constructor(
    private queryParamsService: QueryParamsService,
    private http: HttpClient,
  ) {}

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

  get flightsStream$(): Observable<Flight[]> {
    return this.queryParamsService.queryParams$.pipe(
      filter(
        (params) => !!params.fromKey && !!params.toKey && !!params.forwardDate
      ),
      map((params) => ({
        fromKey: params.fromKey,
        toKey: params.toKey,
        forwardDate: params.forwardDate.substring(0, 10),
        backDate: params.backDate.substring(0, 10)
      })),
      switchMap((body) => this.http.post<Flight[]>(`${API_URL}${API_FLIGHT}`, body)),
    );
  }
}
