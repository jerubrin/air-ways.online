import { Component, Input } from '@angular/core';
import { Price } from '../../models/price.model';

@Component({
  selector: 'app-date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss']
})
export class DateCardComponent {
  @Input() price?: Price | null;

  @Input() date?: Date;

  @Input() isSellected?: boolean;
}
