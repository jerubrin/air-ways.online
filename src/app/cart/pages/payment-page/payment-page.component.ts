import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageKeys } from 'src/app/core/data/enams/local-storage.enum';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {
  showPreloader = false;

  constructor(
    private router: Router,
    public store: MainStoreService,
    private snackBar: MatSnackBar,
  ) {}

  pay() {
    const isCartData = sessionStorage.getItem(LocalStorageKeys.IsCartData) === 'true';
    this.showPreloader = true;
    setTimeout(() => {
      this.showPreloader = false;
      this.openSnackBar('Success!', 'OK');
      setTimeout(() => {
        if (this.store.currentCartItemId) {
          this.store.removeFromCart(this.store.currentCartItemId);
        }

        if (isCartData) {
          this.store.cart.filter((item) => item.isChecked).forEach((item) => {
            this.store.removeFromCart(item.id);
          });
        }

        sessionStorage.clear();
        this.router.navigate([RoutesPath.MainPage]);
      }, 3000);
    }, 12000);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
