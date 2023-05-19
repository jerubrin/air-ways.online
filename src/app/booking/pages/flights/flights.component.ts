import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { FlightSearchService } from 'src/app/core/services/flight-search.service';
import { Subscription } from 'rxjs';
import { FlightsApiService } from 'src/app/core/services/flights-api.service';
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
    public flightSearchService: FlightSearchService,
    public flightsApiService: FlightsApiService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.flightsApiService.flightsStream$.subscribe((flights) => {
        this.flightSearchService.selectFlight(0, undefined);
        this.flightSearchService.selectFlight(1, undefined);
        this.flights = flights;
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

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPagePassengers}`], {
      queryParamsHandling: 'merge'
    });

    this.stepperService.next();
  }
}
