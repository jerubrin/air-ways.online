import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/booking/models/flight.model';
import { FlightSearch } from 'src/app/shared/interfaces/flight-search.model';
import { Airport } from 'src/app/shared/interfaces/airport.model';
import { ReplaySubject, debounceTime, switchMap, catchError, throwError } from 'rxjs';
import { API_AIRPORT, API_FLIGHT, API_URL } from '../data/uri/api-url.constants';

const DEBOUNCE_TIME = 500;

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  searchForm: Partial<FlightSearch> = {};

  private from$ = new ReplaySubject<string>(1);

  private destination$ = new ReplaySubject<string>(1);

  constructor(route: ActivatedRoute, private http: HttpClient) {
    route.queryParams.subscribe((queryParams) => {
      this.searchForm.fromKey = queryParams?.['fromKey'];
      this.searchForm.toKey = queryParams?.['toKey'];
      this.searchForm.forwardDate = queryParams?.['forwardDate'];
      this.searchForm.backDate = queryParams?.['backDate'];
      this.searchForm.adults = queryParams?.['adults'];
      this.searchForm.children = queryParams?.['children'];
      this.searchForm.infants = queryParams?.['infants'];
    });
  }

  getFlights() {
    this.http.post<Flight[]>(`${API_URL}${API_FLIGHT}`, this.searchForm);
  }

  setFromString = (from: string) => this.from$.next(from);

  setDestination = (destination: string) => this.destination$.next(destination);

  getFromAirpostStream() {
    return this.from$.pipe(
      debounceTime(DEBOUNCE_TIME),
      switchMap((searchString) => this.http.get<Airport>(`${API_URL}${API_AIRPORT}?q=${searchString}`))
    );
  }

  getDestinationAirpostStream() {
    return this.destination$.pipe(
      debounceTime(DEBOUNCE_TIME),
      switchMap((searchString) => this.http.get<Airport>(`${API_URL}${API_AIRPORT}?q=${searchString}`))
    );
  }

  // NOTE  Из этого сервиса я использую только ЭТО
  // (этого метода мне достаточно, добавила на вход данные из query или которые были введены в поле и обработчик ошибок)
  getAirportStream(searchText: string) {
    return this.http.get<Airport[]>(`${API_URL}${API_AIRPORT}?q=${searchText}`).pipe(
      debounceTime(DEBOUNCE_TIME),
      catchError((error) => throwError('Error occurred while fetching airports', error))
    );
  }
}
