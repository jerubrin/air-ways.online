import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageKeys } from 'src/app/core/data/enams/local-storage.enum';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { ReviewPaymentService } from '../../services/review-payment.service';

@Component({
  selector: 'app-review-payment',
  templateUrl: './review-payment.component.html',
  styleUrls: ['./review-payment.component.scss']
})
export class ReviewPaymentComponent implements AfterViewInit {
  form!: FormGroup;

  isBooked = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public reviewPaymentService: ReviewPaymentService,
    private fb: FormBuilder,
    public store: MainStoreService,
    private queryParamsService: QueryParamsService,
    private paymentService: PaymentService
  ) {}

  ngAfterViewInit() {
    this.createForm();
    const data = sessionStorage.getItem(LocalStorageKeys.Booked);
    this.isBooked = !!data;

    if (data === 'true') {
      sessionStorage.setItem(LocalStorageKeys.Booked, 'false');
    } else {
      sessionStorage.removeItem(LocalStorageKeys.Booked);
    }

    if (!this.isBooked
      && !this.route.snapshot.queryParams['fromKey']
      && !this.route.snapshot.queryParams['toKey']
      && !this.route.snapshot.queryParams['forwardDate']
    ) {
      this.store.clearDataInSessionStorage();
      sessionStorage.clear();
      this.router.navigate([RoutesPath.MainPage]);
    }
  }

  createForm() {
    this.form = this.fb.group({
      review: ['', Validators.required]
    });
  }

  goBack(): void {
    if (this.isBooked) {
      sessionStorage.clear();
      this.router.navigate([RoutesPath.UserAccountPage]);
      return;
    }

    const queryParams = this.queryParamsService.getQueryParams();
    this.router.navigate([RoutesPath.BookingPage, RoutesPath.BookingPagePassengers], {
      queryParams
    });
  }

  onSubmit() {
    if (this.isBooked) {
      return;
    }
    this.store.addAllDataToCart();
    this.router.navigate([RoutesPath.CartPage]);
  }

  onPayment() {
    if (this.isBooked) {
      return;
    }
    sessionStorage.setItem(LocalStorageKeys.IsCartData, 'false');
    this.paymentService.paymentItemsForPay = [this.store.getDataForPay()];
    this.router.navigate([RoutesPath.CartPage, RoutesPath.CartPagePayment]);
  }
}
