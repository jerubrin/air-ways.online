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

  @Output() selectEmitter = new EventEmitter<boolean>(false);

  private _select = false;

  set select(value: boolean) {
    this._select = value;
    this.selectEmitter.emit(value);
  }

  get select(): boolean {
    return this._select;
  }

  openMenu() {}
}
