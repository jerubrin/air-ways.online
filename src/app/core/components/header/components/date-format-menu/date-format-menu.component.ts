import { Component } from '@angular/core';
import DateFormatMenuItems from 'src/app/core/data/constants/DateFormatMenuItems';

@Component({
  selector: 'app-date-format-menu',
  templateUrl: './date-format-menu.component.html',
  styleUrls: ['./date-format-menu.component.scss'],
})
export class DateFormatMenuComponent {
  dateFormat: readonly string[] = DateFormatMenuItems;

  selectedDateFormatItem: string = this.dateFormat[0];

  dateFormatMenuItems: {
    text: string;
    isActive: boolean;
  }[] = this.createDateFormatArray(this.selectedDateFormatItem);

  clickDateFormatMenuItem(selectedItem: string) {
    this.selectedDateFormatItem = selectedItem;

    this.dateFormatMenuItems = this.createDateFormatArray(selectedItem);
  }

  private createDateFormatArray(selectedItem: string): {
    text: string;
    isActive: boolean;
  }[] {
    return this.dateFormat.map((item) => {
      if (item === selectedItem) {
        return { text: item, isActive: true };
      }
      return { text: item, isActive: false };
    });
  }
}
