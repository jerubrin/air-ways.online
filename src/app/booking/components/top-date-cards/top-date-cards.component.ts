import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
export class TopDateCardsComponent implements OnInit, OnDestroy {
  @Input() date?: Date;

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

  localStorageServiceSubs$$?: Subscription;

  constructor(
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.twoDaysBefore = new Date((this.date?.getTime() ?? 0) - DAY_IN_MILISECONDS * 2);
    this.oneDayBefore = new Date((this.date?.getTime() ?? 0) - DAY_IN_MILISECONDS);
    this.oneDayAfter = new Date((this.date?.getTime() ?? 0) + DAY_IN_MILISECONDS);
    this.twoDaysAfter = new Date((this.date?.getTime() ?? 0) + DAY_IN_MILISECONDS * 2);
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
