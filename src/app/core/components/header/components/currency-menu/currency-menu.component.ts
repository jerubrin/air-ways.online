import { Component } from '@angular/core';
import CurrencyMenuItems from 'src/app/core/data/constants/CurrencyMenuItems';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-currency-menu',
  templateUrl: './currency-menu.component.html',
  styleUrls: ['./currency-menu.component.scss'],
})
export class CurrencyMenuComponent {
  constructor(
    private localStorageService: LocalStorageService
  ) {
    localStorageService.currencyStream$?.subscribe((value) => {
      this.selectedCurrencyItem = value;
    });
  }

  currencyMenuItems: readonly string[] = CurrencyMenuItems;

  selectedCurrencyItem?: string;

  clickCurrencyMenuItem(selectedItem: string): void {
    this.localStorageService.setCurrency(selectedItem);
  }
}
