import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { DateFormatType } from '../../types/DateFormatType';
import { minDateValidator } from '../../validators/minDateValidator';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnDestroy {
  @Input() initialValue!: Date | null;

  minDate: Date = new Date();

  selectedDateFormat!: DateFormatType;

  private subscriptions: Subscription[] = [];

  dateControl!: FormControl;

  constructor(private dateFormatService: DateFormatService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.dateControl = new FormControl(this.initialValue, [
      Validators.required,
      minDateValidator()
    ]);

    this.subscriptions.push(
      this.dateFormatService.selectedDateFormat$.subscribe((value) => {
        this.selectedDateFormat = value;
        this.onDateChanged();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onDateChanged(): void {
    const currentDateValue = this.dateControl.value;

    if (currentDateValue) {
      const formattedDate = this.formatDate(currentDateValue, this.selectedDateFormat);
      const inputDeparture = this.elementRef.nativeElement.querySelector(
        '.my-datepicker-input-departure'
      );
      if (inputDeparture) {
        inputDeparture.value = formattedDate;
      }
    }
  }

  private formatDate(date: Date | null, format: string): string {
    return moment(date).format(format.replace('MM', 'M').replace('DD', 'D').replace('YYYY', 'Y'));
  }
}
