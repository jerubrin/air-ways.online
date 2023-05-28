import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Price } from 'src/app/booking/models/price.model';
import { Cart } from 'src/app/core/interfaces/cart';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss']
})
export class TotalPriceComponent implements OnInit {
  @Input() cart$?: Observable<Cart[]>;

  @Output() addNew = new EventEmitter();

  cart$$?: Subscription;

  price?: Price;

  ngOnInit() {
    this.cart$$ = this.cart$?.subscribe((cartList) => {
      this.price = cartList
        .filter((item) => item.isChecked)
        .reduce((sum: Price, item: Cart) => ({
          eur: item.cartPriceData.totalPrice.eur + sum.eur,
          usd: item.cartPriceData.totalPrice.usd + sum.usd,
          rub: item.cartPriceData.totalPrice.rub + sum.rub,
          pln: item.cartPriceData.totalPrice.pln + sum.pln
        }), { eur: 0, usd: 0, rub: 0, pln: 0 });
    });
  }
}
