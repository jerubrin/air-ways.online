import { Component } from '@angular/core';

@Component({
  selector: 'app-currency-menu',
  templateUrl: './currency-menu.component.html',
  styleUrls: ['./currency-menu.component.scss'],
})
export default class CurrencyMenuComponent {
  currencyMenuItems: readonly string[] = ['EUR', 'USA', 'RUB', 'PLN'];

  selectedCurrencyItem: string = this.currencyMenuItems[0];

  clickCurrencyMenuItem(selectedItem: string): void {
    this.selectedCurrencyItem = selectedItem;
  }
}
