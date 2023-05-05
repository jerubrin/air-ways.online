import { Component, Input } from '@angular/core';
import { PriceList } from '../../models/prices.model';

@Component({
  selector: 'app-top-date-cards',
  templateUrl: './top-date-cards.component.html',
  styleUrls: ['./top-date-cards.component.scss']
})
export class TopDateCardsComponent {
  @Input() date?: Date;

  @Input() prices?: PriceList;

  @Input() avaible?: number;
}
