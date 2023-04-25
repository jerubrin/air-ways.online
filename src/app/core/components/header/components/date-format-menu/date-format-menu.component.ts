import { Component } from '@angular/core';

interface DateFormatMenuItems {
  text: string;
  isActive: boolean;
}

@Component({
  selector: 'app-date-format-menu',
  templateUrl: './date-format-menu.component.html',
  styleUrls: ['./date-format-menu.component.scss'],
})
export default class DateFormatMenuComponent {
  dateFormat: readonly string[] = [
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY/DD/MM',
    'YYYY/MM/DD',
  ];

  selectedDateFormatItem: string = this.dateFormat[0];

  dateFormatMenuItems: DateFormatMenuItems[] = this.createDateFormatArray(
    // eslint-disable-next-line @typescript-eslint/comma-dangle
    this.selectedDateFormatItem
  );

  clickDateFormatMenuItem(selectedItem: string) {
    this.selectedDateFormatItem = selectedItem;

    this.dateFormatMenuItems = this.createDateFormatArray(selectedItem);
  }

  private createDateFormatArray(selectedItem: string): DateFormatMenuItems[] {
    return this.dateFormat.map((item) => {
      if (item === selectedItem) {
        return { text: item, isActive: true };
      }
      return { text: item, isActive: false };
    });
  }
}
