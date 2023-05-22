import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Price } from 'src/app/booking/models/price.model';
import { TotalPrices } from 'src/app/shared/interfaces/total-prices';

@Component({
  selector: 'app-review-price-container',
  templateUrl: './review-price-container.component.html',
  styleUrls: ['./review-price-container.component.scss']
})
export class ReviewPriceContainerComponent implements OnChanges {
  @Input() allPrices?: TotalPrices;

  totalPrice?: Price;

  ngOnChanges(changes: SimpleChanges): void {
    if (JSON.stringify(changes['allPrices'].currentValue) !== JSON.stringify(changes['allPrices'].previousValue)) {
      this.totalPrice = {
        eur: ((this.allPrices?.adults?.fullPrice.eur ?? 0)
          + (this.allPrices?.children?.fullPrice.eur ?? 0)
          + (this.allPrices?.infants?.fullPrice.eur ?? 0)),
        usd: ((this.allPrices?.adults?.fullPrice.usd ?? 0)
          + (this.allPrices?.children?.fullPrice.usd ?? 0)
          + (this.allPrices?.infants?.fullPrice.usd ?? 0)),
        pln: ((this.allPrices?.adults?.fullPrice.pln ?? 0)
          + (this.allPrices?.children?.fullPrice.pln ?? 0)
          + (this.allPrices?.infants?.fullPrice.pln ?? 0)),
        rub: ((this.allPrices?.adults?.fullPrice.rub ?? 0)
          + (this.allPrices?.children?.fullPrice.rub ?? 0)
          + (this.allPrices?.infants?.fullPrice.rub ?? 0))
      };
    }
  }
}
