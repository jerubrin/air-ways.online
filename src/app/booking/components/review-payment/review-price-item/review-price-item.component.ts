import { Component, Input } from '@angular/core';
import { LongPrice } from 'src/app/shared/interfaces/long-price';

@Component({
  selector: 'app-review-price-item',
  templateUrl: './review-price-item.component.html',
  styleUrls: ['./review-price-item.component.scss']
})
export class ReviewPriceItemComponent {
  @Input() allPrices?: LongPrice;

  @Input() title?: string;

  @Input() count?: number;
}
