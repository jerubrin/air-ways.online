import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SortBy } from '../../../cart/enum/sort-by';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-sort-title',
  templateUrl: './sort-title.component.html',
  styleUrls: ['./sort-title.component.scss']
})
export class SortTitleComponent implements OnInit, OnDestroy {
  @Input() title?: string;

  @Input() hideSort?: boolean;

  @Input() isUpActive?: boolean;

  @Input() isDownActive?: boolean;

  @Input() sortByTypeUp?: SortBy;

  @Input() sortByTypeDown?: SortBy;

  sortBy$$?: Subscription;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    if (this.hideSort) return;

    this.sortBy$$ = this.cartService.sortBy$.subscribe((order) => {
      this.isUpActive = this.sortByTypeUp === order;
      this.isDownActive = this.sortByTypeDown === order;
    });
  }

  ngOnDestroy(): void {
    this.sortBy$$?.unsubscribe();
  }

  sortUp() {
    if (this.sortByTypeUp) this.cartService.sortBy = this.sortByTypeUp;
  }

  sortDown() {
    if (this.sortByTypeDown) this.cartService.sortBy = this.sortByTypeDown;
  }
}
