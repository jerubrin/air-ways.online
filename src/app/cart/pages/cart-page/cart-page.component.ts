import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Price } from 'src/app/booking/models/price.model';
import { LocalStorageKeys } from 'src/app/core/data/enams/local-storage.enum';
import { Cart } from 'src/app/core/interfaces/cart';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { SortBy } from '../../enum/sort-by';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  @Input() items?: Cart[];

  price?: Price;

  SortBy = SortBy;

  constructor(
    public store: MainStoreService,
    public cartService: CartService,
    private router: Router
  ) {}

  addNew() {
    this.router.navigate([RoutesPath.MainPage]);
  }

  edit(id: string) {
    const cartItem = this.store.cart.find((item) => item.id === id);
    if (!cartItem) return;

    this.store.setDataFromCart(id);
    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPagePassengers}`], {
      queryParams: cartItem.queryParams
    });
  }

  delete(id: string) {
    this.store.removeFromCart(id);
  }

  selectCartItem(id: string, value?: boolean) {
    this.store.selectCartItem(id, !!value);
  }

  payment() {
    sessionStorage.setItem(LocalStorageKeys.IsCartData, 'true');
    this.router.navigate([RoutesPath.CartPage, RoutesPath.CartPagePayment]);
  }
}
