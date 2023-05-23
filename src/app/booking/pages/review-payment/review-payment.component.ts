import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
// import { FlightsApiService } from 'src/app/core/services/flights-api.service';
import { PassengerReview } from 'src/app/shared/interfaces/passenger-review';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import { ReviewPaymentService } from '../../services/review-payment.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-review-payment',
  templateUrl: './review-payment.component.html',
  styleUrls: ['./review-payment.component.scss']
})

export class ReviewPaymentComponent implements OnInit {
  form!: FormGroup;

  flights?: Flight[];

  passengers?: PassengerReview[];

  constructor(
    private router: Router,
    public reviewPaymentService: ReviewPaymentService,
    private stepperService: StepperService,
    private fb: FormBuilder,
    // TODO: remove mock data
    // private flightApi: FlightsApiService,
    public store: MainStoreService,
    private queryParamsService: QueryParamsService
  ) {}

  ngOnInit() {
    this.createForm();
    this.passengers = this.store.passengersReview;
    // TODO: remove mock data
    // this.flightApi.flightsStream$.subscribe((flights) => {
    //   this.flights = flights;
    //   this.store.flights = flights;
    //   this.passengers = this.store.passengersReview;
    // });
  }

  createForm() {
    this.form = this.fb.group({
      review: ['', Validators.required]
    });
  }

  goBack(): void {
    const queryParams = this.queryParamsService.getQueryParams();
    this.router.navigate([
      RoutesPath.BookingPage,
      RoutesPath.BookingPagePassengers
    ], { queryParams });
    this.stepperService.previous();
  }

  // FIXME - я сам
  onSubmit() {
    this.router.navigate([RoutesPath.CartPage]);
  }
}
