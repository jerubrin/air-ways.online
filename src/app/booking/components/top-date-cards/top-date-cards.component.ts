import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Subscription } from 'rxjs';
import { Seats } from '../../models/seats.model';
import { Flights } from '../../models/flights.model';
import { Flight } from '../../models/flight.model';

const DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;

@Component({
  selector: 'app-top-date-cards',
  templateUrl: './top-date-cards.component.html',
  styleUrls: ['./top-date-cards.component.scss']
})
export class TopDateCardsComponent implements OnDestroy, OnChanges {
  @Input() date?: string;

  @Input() flights?: Flights;

  @Input() flight?: Flight;

  @Input() seats?: Seats;

  @Input() isSelected?: boolean;

  @Output() selectEmitter = new EventEmitter<number>();

  selected = 0;

  twoDaysBefore?: Date;

  oneDayBefore?: Date;

  oneDayAfter?: Date;

  twoDaysAfter?: Date;

  currentDate?: Date;

  localStorageServiceSubs$$?: Subscription;

  constructor(
    public localStorageService: LocalStorageService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['date']) return;
    const date = new Date(changes['date'].currentValue);
    this.currentDate = date;
    this.twoDaysBefore = new Date((date?.getTime() ?? 0) - DAY_IN_MILISECONDS * 2);
    this.oneDayBefore = new Date((date?.getTime() ?? 0) - DAY_IN_MILISECONDS);
    this.oneDayAfter = new Date((date?.getTime() ?? 0) + DAY_IN_MILISECONDS);
    this.twoDaysAfter = new Date((date?.getTime() ?? 0) + DAY_IN_MILISECONDS * 2);
  }

  ngOnDestroy(): void {
    this.localStorageServiceSubs$$?.unsubscribe();
  }

  clickHandler(value: number) {
    if ((this.flights && this.flights[value]) || value === 0) {
      this.selectEmitter.emit(value);
      this.selected = value;
    }
  }
}
