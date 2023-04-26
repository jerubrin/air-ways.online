import { Component } from '@angular/core';
import CurrencyMenuItems from 'src/app/core/data/constants/CurrencyMenuItems';

@Component({
  selector: 'app-currency-menu',
  templateUrl: './currency-menu.component.html',
  styleUrls: ['./currency-menu.component.scss'],
})
export class CurrencyMenuComponent {
  currencyMenuItems: readonly string[] = CurrencyMenuItems;

  selectedCurrencyItem: string = this.currencyMenuItems[0];

  clickCurrencyMenuItem(selectedItem: string): void {
    this.selectedCurrencyItem = selectedItem;
  }
}
