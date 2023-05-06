import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Subscription } from 'rxjs';
import { PriceList } from '../../models/prices.model';

const DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;

@Component({
  selector: 'app-top-date-cards',
  templateUrl: './top-date-cards.component.html',
  styleUrls: ['./top-date-cards.component.scss']
})
export class TopDateCardsComponent implements OnInit, OnDestroy {
  @Input() date?: Date;

  @Input() prices?: PriceList;

  @Input() avaible?: number | undefined;

  twoDaysBefore?: Date;

  oneDayBefore?: Date;

  oneDayAfter?: Date;

  twoDaysAfter?: Date;

  localStorageServiceSubs$$?: Subscription;

  constructor(
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.twoDaysBefore = new Date(this.date?.getTime() ?? 0 - DAY_IN_MILISECONDS * 2);
    this.oneDayBefore = new Date(this.date?.getTime() ?? 0 - DAY_IN_MILISECONDS);
    this.oneDayAfter = new Date(this.date?.getTime() ?? 0 + DAY_IN_MILISECONDS);
    this.twoDaysAfter = new Date(this.date?.getTime() ?? 0 + DAY_IN_MILISECONDS * 2);
  }

  ngOnDestroy(): void {
    this.localStorageServiceSubs$$?.unsubscribe();
  }
}
