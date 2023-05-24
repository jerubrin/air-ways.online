import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

@Component({
  selector: 'app-shopping-cart-button',
  templateUrl: './shopping-cart-button.component.html',
  styleUrls: ['./shopping-cart-button.component.scss'],
})
export class ShoppingCartButtonComponent {
  constructor(
    private router: Router,
    public store: MainStoreService,
  ) {}

  navigateToCart() {
    this.router.navigate([RoutesPath.CartPage]);
  }
}
