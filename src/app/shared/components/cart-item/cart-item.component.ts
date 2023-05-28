/* eslint-disable no-underscore-dangle */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart } from 'src/app/core/interfaces/cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() item?: Cart;

  @Output() edit = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Output() selectEmitter = new EventEmitter<boolean | undefined>(false);

  @Input() select?: boolean;

  @Input() editText?: string;

  getGmt(index: number) {
    const diff = +this.item.flights[index].to.gmt - +this.item.flights[index].form.gmt;
    return Number.isNaN(diff) ? 0 : diff;
  }
}
