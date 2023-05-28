import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from 'src/app/core/data/enams/local-storage.enum';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss']
})
export class UserAccountPageComponent implements OnInit {
  constructor(
    public paymentService: PaymentService,
    private router: Router,
    private store: MainStoreService
  ) {}

  ngOnInit(): void {
    this.paymentService.loadList();
  }

  show(id: string) {
    this.store.selectedPayment =
      this.paymentService.payments.find((item) => item.id === id);
    sessionStorage.setItem(LocalStorageKeys.Booked, 'true');

    if (this.store.selectedPayment) {
      this.router.navigate([RoutesPath.BookingPage, RoutesPath.BookingPageReviewPayment]);
    }
  }

  delete(id: string) {
    this.paymentService.delete(id);
  }
}
