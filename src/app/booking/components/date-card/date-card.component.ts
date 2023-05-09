import { Component, Input, OnInit } from '@angular/core';
import { CurrencyEnum, CurrencySymbolsEnum } from 'src/app/shared/data/constants/CurrencyMenuItems';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Price } from '../../models/price.model';
import { Seats } from '../../models/seats.model';

@Component({
  selector: 'app-date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss'],
})
export class DateCardComponent implements OnInit {
  @Input() price?: Price | null;

  @Input() date?: Date;

  @Input() seats?: Seats;

  @Input() selected?: boolean;

  priceString = '';

  constructor(
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.localStorageService.currencyStream$?.subscribe((value) => {
      switch (value) {
        case CurrencyEnum.USA:
          this.priceString = `${CurrencySymbolsEnum.USA}${this.price?.usd}`;
          break;
        case CurrencyEnum.RUB:
          this.priceString = `${CurrencySymbolsEnum.RUB}${this.price?.rub}`;
          break;
        case CurrencyEnum.PLN:
          this.priceString = `${CurrencySymbolsEnum.PLN}${this.price?.pln}`;
          break;
        default:
          this.priceString = `${CurrencySymbolsEnum.EUR}${this.price?.eur}`;
      }
    });
  }
}
