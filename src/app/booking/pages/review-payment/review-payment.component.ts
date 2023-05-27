import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageKeys } from 'src/app/core/data/enams/local-storage.enum';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
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
    this.router.navigate([RoutesPath.BookingPage, RoutesPath.BookingPagePassengers], {
      queryParams
    });
  }

  onSubmit() {
    this.store.addAllDataToCart();
    this.router.navigate([RoutesPath.CartPage]);
  }

  onPayment() {
    sessionStorage.setItem(LocalStorageKeys.IsCartData, 'false');
    this.router.navigate([RoutesPath.CartPage, RoutesPath.CartPagePayment]);
  }
}
