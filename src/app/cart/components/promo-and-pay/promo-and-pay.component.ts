import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/core/interfaces/cart';

@Component({
  selector: 'app-promo-and-pay',
  templateUrl: './promo-and-pay.component.html',
  styleUrls: ['./promo-and-pay.component.scss']
})
export class PromoAndPayComponent {
  @Input() cart$?: Observable<Cart[] | null>;

  selectedCount = 0;

  promo = '';

  message = '';

  onSubmitPromo() {
    if (this.promo === '') {
      this.message = 'Please input promo code';
    } else {
      this.message = 'Promo code not found :(';
    }
  }

  onSubmit() {}
}
