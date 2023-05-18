import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Airport } from 'src/app/shared/interfaces/airport.model';
import { debounceTime, catchError, throwError, Observable, filter, map, switchMap } from 'rxjs';
import { Flight } from 'src/app/booking/models/flight.model';
import { API_AIRPORT, API_FLIGHT, API_URL } from '../data/uri/api-url.constants';
import { QueryParamsService } from './query-params.service';

const DEBOUNCE_TIME = 500;

@Injectable({
  providedIn: 'root'
})
export class FlightsApiService {
  constructor(
    private http: HttpClient,
    private queryParamsService: QueryParamsService
  ) {}

  getAirportStream(searchText: string) {
    return this.http.get<Airport[]>(`${API_URL}${API_AIRPORT}?q=${searchText}`).pipe(
      debounceTime(DEBOUNCE_TIME),
      catchError((error) => throwError('Error occurred while fetching airports', error))
    );
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
