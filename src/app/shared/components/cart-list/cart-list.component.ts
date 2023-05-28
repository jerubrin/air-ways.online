import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortBy } from 'src/app/cart/enum/sort-by';
import { CartService } from 'src/app/cart/services/cart.service';
import { Cart } from 'src/app/core/interfaces/cart';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  constructor(
    public cartService: CartService
  ) {}

  @Input() title?: string;

  @Input() allSelected?: boolean;

  @Output() selectAll = new EventEmitter<boolean>();

  @Output() edit = new EventEmitter<string>();

  @Output() delete = new EventEmitter<string>();

  @Output() selectCartItem = new EventEmitter<{ id: string, value: boolean }>();

  SortBy = SortBy;

  cart?: Cart[];
}
