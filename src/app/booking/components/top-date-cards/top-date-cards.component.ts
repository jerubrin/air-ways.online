import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Seats } from '../../models/seats.model';
import { Flights } from '../../models/flights.model';
import { Flight } from '../../models/flight.model';

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

@Component({
  selector: 'app-top-date-cards',
  templateUrl: './top-date-cards.component.html',
  styleUrls: ['./top-date-cards.component.scss']
})
export class TopDateCardsComponent implements OnChanges {
  @Input() date?: string;

  @Input() flights?: Flights;

  @Input() flight?: Flight;

  @Input() seats?: Seats;

  @Input() isSelected?: boolean;

  @Output() selectEmitter = new EventEmitter<number>();

  @Input() select?: number;

  selected = 0;

  twoDaysBefore?: Date;

  oneDayBefore?: Date;

  oneDayAfter?: Date;

  twoDaysAfter?: Date;

  currentDate?: Date;

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['date']) return;
    const date = new Date(changes['date'].currentValue);
    this.currentDate = date;
    this.twoDaysBefore = new Date((date?.getTime() ?? 0) - DAY_IN_MILLISECONDS * 2);
    this.oneDayBefore = new Date((date?.getTime() ?? 0) - DAY_IN_MILLISECONDS);
    this.oneDayAfter = new Date((date?.getTime() ?? 0) + DAY_IN_MILLISECONDS);
    this.twoDaysAfter = new Date((date?.getTime() ?? 0) + DAY_IN_MILLISECONDS * 2);
    this.selected = this.select ?? 0;
  }

  clickHandler(value: number) {
    if ((this.flights && this.flights[value]) || value === 0) {
      this.selectEmitter.emit(value);
      this.selected = value;
    }
  }
}
