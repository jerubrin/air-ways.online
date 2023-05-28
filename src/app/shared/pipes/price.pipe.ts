import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CurrencyEnum, CurrencySymbolsEnum } from 'src/app/shared/data/constants/CurrencyMenuItems';
import { Observable, map } from 'rxjs';
import { Price } from 'src/app/booking/models/price.model';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  constructor(
    public localStorageService: LocalStorageService,
  ) {}

  transform(price?: Price | null): Observable<string> | undefined {
    return this.localStorageService.currencyStream$?.pipe(
      map((value) => {
        switch (value) {
          case CurrencyEnum.USA:
            return `${CurrencySymbolsEnum.USA}${price?.usd.toFixed(2)}`;
          case CurrencyEnum.RUB:
            return `${CurrencySymbolsEnum.RUB}${price?.rub.toFixed(2)}`;
          case CurrencyEnum.PLN:
            return `${CurrencySymbolsEnum.PLN}${price?.pln.toFixed(2)}`;
          default:
            return `${CurrencySymbolsEnum.EUR}${price?.eur.toFixed(2)}`;
        }
      }),
    );
  }
}
