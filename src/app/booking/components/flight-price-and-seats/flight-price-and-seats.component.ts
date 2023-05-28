import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Price } from '../../models/price.model';
import { Seats } from '../../models/seats.model';

@Component({
  selector: 'app-flight-price-and-seats',
  templateUrl: './flight-price-and-seats.component.html',
  styleUrls: ['./flight-price-and-seats.component.scss']
})
export class FlightPriceAndSeatsComponent {
  @Input() isSelected?: boolean;

  @Input() price?: Price | null;

  @Input() seats?: Seats;

  @Output() setSelection: EventEmitter<boolean> = new EventEmitter<boolean>();

  setSelectionFn = (value: boolean) => this.setSelection.emit(value);
}
