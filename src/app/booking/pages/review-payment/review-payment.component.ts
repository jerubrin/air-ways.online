import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { ReviewPaymentService } from '../../services/review-payment.service';

@Component({
  selector: 'app-review-payment',
  templateUrl: './review-payment.component.html',
  styleUrls: ['./review-payment.component.scss']
})
export class ReviewPaymentComponent {
  form!: FormGroup;

  flights: any;

  passengers: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reviewPaymentService: ReviewPaymentService,
    private stepperService: StepperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();

    this.flights = this.route.snapshot.queryParams['flights'];

    this.passengers = this.route.snapshot.queryParams['passengers'];
  }

  createForm() {
    this.form = this.fb.group({
      review: ['', Validators.required]
    });
  }

  goBack() {
    const queryParams: Params = { flights: this.flights, passengers: this.passengers };

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPagePassengers}`], {
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.stepperService.previous();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.reviewPaymentService.updateFormState(this.form);

    this.router.navigate([RoutesPath.CartPage]);
  }
}
