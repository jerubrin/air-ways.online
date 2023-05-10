import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlightSearchService } from 'src/app/core/services/flight-search.service';

import { StepperService } from 'src/app/core/services/stepper.service';

import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { FlightSearch } from 'src/app/shared/interfaces/flight-search.model';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {
  form!: FormGroup;

  currentParams: any;

  fromWhere!: string;

  to!: string;

  params!: FlightSearch;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private flightsService: FlightsService,
    private flightSearchService: FlightSearchService,
    private stepperService: StepperService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();

    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentParams = params;
      this.fromWhere = params['fromKey'];
      this.to = params['toKey'];
    });

    this.flightSearchService.getFlightSearchParams().subscribe((patam) => {
      this.params = patam;
    });
  }

  createForm() {
    this.form = this.fb.group({
      flights: ['', Validators.required]
    });
  }

  goBack(): void {
    // let params = null;

    // this.flightSearchService.getFlightSearchParams().subscribe((patam) => {
    //   params = patam;
    // });

    this.router.navigate([RoutesPath.MainPage], {
      queryParams: this.params
    });
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
}
