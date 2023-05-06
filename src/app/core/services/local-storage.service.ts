import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { CurrencyEnum } from '../data/constants/CurrencyMenuItems';
import { LocalStorageKeys } from '../data/enams/local-storage.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private currency$?: ReplaySubject<CurrencyEnum>;

  constructor() {
    this.currency$ = new ReplaySubject(1);
    this.nextCurrency();
  }

  setCurrency(currency: string) {
    localStorage.setItem(LocalStorageKeys.Currency, currency);
    this.nextCurrency();
  }

  get currencyStream$(): Observable<CurrencyEnum> | undefined {
    return this.currency$?.asObservable();
  }

  private nextCurrency() {
    let currencyEnumValue = CurrencyEnum.EUR;
    switch (localStorage.getItem(LocalStorageKeys.Currency)) {
      case CurrencyEnum.EUR: currencyEnumValue = CurrencyEnum.EUR; break;
      case CurrencyEnum.USA: currencyEnumValue = CurrencyEnum.USA; break;
      case CurrencyEnum.RUB: currencyEnumValue = CurrencyEnum.RUB; break;
      case CurrencyEnum.PLN: currencyEnumValue = CurrencyEnum.PLN; break;
      default: currencyEnumValue = CurrencyEnum.EUR;
    }
    this.currency$?.next(currencyEnumValue);
  }
}
