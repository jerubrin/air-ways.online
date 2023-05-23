import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

@Component({
  selector: 'app-review-payment',
  templateUrl: './review-payment.component.html',
  styleUrls: ['./review-payment.component.scss']
})
export class ReviewPaymentComponent {
  constructor(
    private router: Router,
    private stepperService: StepperService,
    private queryParamsService: QueryParamsService
  ) {}

  goBack() {
    const queryParams = this.queryParamsService.getQueryParams();

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPagePassengers}`], {
      queryParams
    });
    this.stepperService.previous();
  }

  // FIXME -
  onSubmit() {
    this.router.navigate([RoutesPath.CartPage]);
  }
}
