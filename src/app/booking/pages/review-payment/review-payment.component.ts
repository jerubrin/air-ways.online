import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import { ReviewPaymentService } from '../../services/review-payment.service';

@Component({
  selector: 'app-review-payment',
  templateUrl: './review-payment.component.html',
  styleUrls: ['./review-payment.component.scss']
})

export class ReviewPaymentComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    public reviewPaymentService: ReviewPaymentService,
    private stepperService: StepperService,
    private fb: FormBuilder,
    public store: MainStoreService,
    private queryParamsService: QueryParamsService
  ) {}

  ngOnInit() {
    this.createForm();
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

  onSubmit() {
    this.store.addAllDataToCart();
    this.router.navigate([RoutesPath.CartPage]);
  }
}
