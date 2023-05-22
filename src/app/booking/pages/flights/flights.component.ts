import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { FlightSearchService } from 'src/app/core/services/flight-search.service';
import { Subscription } from 'rxjs';
import { FlightsApiService } from 'src/app/core/services/flights-api.service';
import { MainStoreService } from 'src/app/core/services/main-store.service';
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
    private stepperService: StepperService,
    private queryParamsService: QueryParamsService,
    private activatedRoute: ActivatedRoute,
    public flightSearchService: FlightSearchService,
    public flightsApiService: FlightsApiService,
    public mainStoreService: MainStoreService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.flightsApiService.flightsStream$.subscribe((flights) => {
        this.flightSearchService.selectFlight(0, undefined);
        this.flightSearchService.selectFlight(1, undefined);
        this.flightSearchService.hasBackDate = flights.length === 2;
        this.flights = flights;
      })
    );
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.flightSearchService.totalCountOfSeats = Number(params?.['adults'] ?? 0);
        this.flightSearchService.totalCountOfSeats += Number(params?.['children'] ?? 0);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => {
      subs.unsubscribe();
    });
  }

  goBack(): void {
    const queryParams = this.queryParamsService.getQueryParams();
    this.router.navigate([RoutesPath.MainPage], { queryParams });
  }

  onSubmit(): void {
    if (!this.flightSearchService.isValid) {
      return;
    }

    this.mainStoreService.flights = this.flightSearchService.selectedFlights
      .filter(Boolean) as Flight[];

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPagePassengers}`], {
      queryParamsHandling: 'merge'
    });

    this.stepperService.next();
  }
}
