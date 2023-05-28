import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cart } from 'src/app/core/interfaces/cart';

@Component({
  selector: 'app-promo-and-pay',
  templateUrl: './promo-and-pay.component.html',
  styleUrls: ['./promo-and-pay.component.scss']
})
export class PromoAndPayComponent implements OnInit, OnDestroy {
  @Input() cart$?: Observable<Cart[] | null>;

  @Output() pay = new EventEmitter();

  selectedCount = 0;

  promo = '';

  message = '';

  isDisabled = false;

  cart$$?: Subscription;

  onSubmitPromo() {
    if (this.promo === '') {
      this.message = 'Please input promo code';
    } else {
      this.message = 'Promo code not found :(';
    }
  }

  onSubmit() {}

  ngOnInit(): void {
    this.cart$$ = this.cart$?.subscribe((items) => {
      this.isDisabled = !items || !items.some((item) => item.isChecked);
    });
  }

  ngOnDestroy(): void {
    this.cart$$?.unsubscribe();
  }
}
