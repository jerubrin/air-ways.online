import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { CurrencyEnum } from '../../shared/data/constants/CurrencyMenuItems';
import { LocalStorageKeys } from '../data/enams/local-storage.enum';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private currency$?: ReplaySubject<CurrencyEnum>;

  constructor() {
    this.currency$ = new ReplaySubject(1);
    this.nextCurrency();
  }

  setCart(cart: Cart[], index = -1) {
    localStorage.setItem(
      LocalStorageKeys.Cart,
      JSON.stringify(cart)
    );
    localStorage.setItem(
      LocalStorageKeys.CartIndex,
      index.toString()
    );
  }

  getCart(): Cart[] {
    const cart = localStorage.getItem(LocalStorageKeys.Cart);
    try {
      if (cart) {
        return JSON.parse(cart);
      }
    } catch {
      localStorage.removeItem(LocalStorageKeys.Cart);
    }
    return [];
  }

  getSelectedIndex(): number {
    const index = localStorage.getItem(LocalStorageKeys.CartIndex);
    if (index && !Number.isNaN(+index)) {
      return +index;
    }
    return -1;
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
