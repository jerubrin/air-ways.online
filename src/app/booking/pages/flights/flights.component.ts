import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlightSearchService } from 'src/app/core/services/flight-search.service';
import { FlightsApiService } from 'src/app/core/services/flights-api.service';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  flights: Flight[] = [];

  constructor(
    private router: Router,
    private queryParamsService: QueryParamsService,
    private activatedRoute: ActivatedRoute,
    public flightSearchService: FlightSearchService,
    public flightsApiService: FlightsApiService,
    public mainStoreService: MainStoreService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.flightsApiService.flightsStream$.subscribe((flights) => {
        if (!this.mainStoreService.flightResults) {
          this.mainStoreService.flightResults = flights;
          this.flightSearchService.selectFlight(0, undefined);
          this.flightSearchService.selectFlight(1, undefined);
          this.mainStoreService.selectedFlights = [0, 0];
        }
        this.flightSearchService.hasBackDate = this.mainStoreService.flightResults.length === 2;
        this.flights = this.mainStoreService.flightResults;
      })
    );
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.flightSearchService.totalCountOfSeats = Number(params?.['adults'] ?? 0);
        this.flightSearchService.totalCountOfSeats += Number(params?.['children'] ?? 0);
        if (JSON.stringify(params) !== JSON.stringify(this.mainStoreService.queryParams)) {
          this.mainStoreService.queryParams = params;
          if (params['adults'] !== this.mainStoreService.queryParams.adults) return;
          if (params['children'] !== this.mainStoreService.queryParams.children) return;
          if (params['infants'] !== this.mainStoreService.queryParams.infants) return;
          this.mainStoreService.flightResults = undefined;
          this.flightSearchService.selectFlight(0, undefined);
          this.flightSearchService.selectFlight(1, undefined);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => {
      subs.unsubscribe();
    });
    this.flightsApiService.prevParams = undefined;
  }

  goBack(): void {
    const queryParams = this.queryParamsService.getQueryParams();
    this.router.navigate([RoutesPath.MainPage], { queryParams });
  }

  onSubmit(): void {
    if (!this.flightSearchService.isValid) {
      return;
    }

    this.mainStoreService.flights = this.flightSearchService.selectedFlights.filter(
      Boolean
    ) as Flight[];

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPagePassengers}`], {
      queryParamsHandling: 'merge'
    });
  }
}
