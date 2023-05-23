import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Airport } from 'src/app/shared/interfaces/airport.model';
import { debounceTime, catchError, throwError, Observable, filter, map, switchMap, tap } from 'rxjs';
import { Flight } from 'src/app/booking/models/flight.model';
import { ActivatedRoute } from '@angular/router';
import { API_AIRPORT, API_FLIGHT, API_URL } from '../data/uri/api-url.constants';

const DEBOUNCE_TIME = 500;

@Injectable({
  providedIn: 'root'
})
export class FlightsApiService {
  timeZone = '';

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

  getAirportStream(searchText: string) {
    return this.http.get<Airport[]>(`${API_URL}${API_AIRPORT}?q=${searchText}`).pipe(
      debounceTime(DEBOUNCE_TIME),
      catchError((error) => throwError('Error occurred while fetching airports', error))
    );
  }

  get flightsStream$(): Observable<Flight[]> {
    return this.activatedRoute.queryParams.pipe(
      tap((params) => this.timeZone = params?.['forwardDate']?.substring(19)),
      filter((params) => !!params['fromKey'] && !!params['toKey'] && !!params['forwardDate']),
      map((params) => ({
        fromKey: (params['fromKey'] as string | undefined ?? '').toUpperCase(),
        toKey: (params['toKey'] as string | undefined ?? '').toUpperCase(),
        forwardDate: params['forwardDate'].substring(0, 10),
        backDate: params['backDate'].substring(0, 10)
      })),
      switchMap((body) => this.http.post<Flight[]>(`${API_URL}${API_FLIGHT}`, body)),
      map((flights) => flights.map((flight) => {
        const takeoffDate = `${flight?.takeoffDate?.substring(0, 19) ?? ''}${this.timeZone}`;
        const landingDate = `${flight?.landingDate?.substring(0, 19) ?? ''}${this.timeZone}`;
        const flightClone = { ...flight, takeoffDate, landingDate };
        return flightClone;
      }))
    );
  }
}
