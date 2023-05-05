import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateFormatMenuItems } from 'src/app/core/data/constants/DateFormatMenuItems';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { DateFormatType } from 'src/app/core/types/DateFormatType';

@Component({
  selector: 'app-date-format-menu',
  templateUrl: './date-format-menu.component.html',
  styleUrls: ['./date-format-menu.component.scss']
})
export class DateFormatMenuComponent implements OnInit, OnDestroy {
  dateFormat: readonly DateFormatType[] = DateFormatMenuItems;

  selectedDateFormat!: DateFormatType;

  dateFormatMenuItems!: {
    text: DateFormatType;
    isActive: boolean;
  }[];

  private subscriptions: Subscription[] = [];

  constructor(private dateFormatService: DateFormatService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.dateFormatService.selectedDateFormat$.subscribe((value) => {
        this.selectedDateFormat = value;

        this.dateFormatMenuItems = this.createDateFormatArray(value);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  clickDateFormatMenuItem(selectedItem: DateFormatType): void {
    this.dateFormatService.setSelectedDateFormat(selectedItem);
  }

  private createDateFormatArray(selectedItem: DateFormatType): {
    text: DateFormatType;
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
