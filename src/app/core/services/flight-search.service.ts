import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, filter, map, switchMap, tap } from 'rxjs';
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

  constructor(
    private queryParamsService: QueryParamsService,
    private http: HttpClient,
  ) {}

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

  get flightsStream$(): Observable<Flight[]> {
    return this.queryParamsService.queryParams$.pipe(
      tap(console.log),
      filter(
        (params) => !!params.fromKey && !!params.toKey && !!params.forwardDate && !!params.backDate
      ),
      map((params) => ({
        fromKey: params.fromKey,
        toKey: params.toKey,
        forwardDate: params.forwardDate.substring(0, 10),
        backDate: params.backDate.substring(0, 10)
      })),
      switchMap((body) => this.http.post<Flight[]>(`${API_URL}${API_FLIGHT}`, body)),
      tap(console.log),
    );
  }
}
