import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      review: ['', Validators.required]
    });
  }

  goBack() {
    window.history.back();

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
