/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { FlightSearch } from 'src/app/shared/interfaces/flight-search.model';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { FlightSearchService } from 'src/app/core/services/flight-search.service';
import { Subscription } from 'rxjs';
import { FlightsQueryParamsService } from 'src/app/core/services/flights.service';
import { Flight } from '../../models/flight.model';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  form!: FormGroup;

  currentParams: any;

  fromWhere!: string;

  to!: string;

  params!: FlightSearch;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private flightsService: FlightsService,
    private flightsQueryParamsService: FlightsQueryParamsService,
    private stepperService: StepperService,
    private activatedRoute: ActivatedRoute,
    private queryParamsService: QueryParamsService,
    private flightSearchService: FlightSearchService,
  ) {}

  ngOnInit() {
    this.createForm();

    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.currentParams = params;
        this.fromWhere = params['fromKey'];
        this.to = params['toKey'];
      })
    );

    this.subscriptions.push(
      this.flightSearchService.flightsStream$.subscribe((flights) => {
        this.flights = flights;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => {
      subs.unsubscribe();
    });
  }

  createForm() {
    this.form = this.fb.group({
      flightOne: ['', Validators.required],
      flightTwo: ['', Validators.required]
    });
  }

  goBack(): void {
    const queryParams = this.queryParamsService.getQueryParams();
    this.router.navigate([RoutesPath.MainPage], { queryParams });
    // this.router.navigate([RoutesPath.MainPage]);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const queryParamsdffdf: Params = { flights: this.form.value.flights };

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPagePassengers}`], {
      queryParams: queryParamsdffdf,
      queryParamsHandling: 'merge'
    });

    this.stepperService.next();

    this.flightsService.updateFormState(this.form);
  }

  flights: Flight[] = [];
}
