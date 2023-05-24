import { Component, Input } from '@angular/core';
import { Price } from 'src/app/booking/models/price.model';
import { Cart } from 'src/app/core/interfaces/cart';
import { MainStoreService } from 'src/app/core/services/main-store.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
  @Input() items?: Cart[];

  price?: Price;

  constructor(
    public store: MainStoreService
  ) {}

  edit(id: string) {
    this.store.removeFromCart(id);
  }

  delete(id: string) {
    this.store.setDataFromCart(id);
  }

  selectCartItem(id: string, value?: boolean) {
    this.store.selectCartItem(id, !!value);
  }
}
