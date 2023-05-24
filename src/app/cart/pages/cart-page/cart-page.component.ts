import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Price } from 'src/app/booking/models/price.model';
import { Cart } from 'src/app/core/interfaces/cart';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  @Input() items?: Cart[];

  price?: Price;

  constructor(
    public store: MainStoreService,
    private router: Router,
    private stepperService: StepperService
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
}
