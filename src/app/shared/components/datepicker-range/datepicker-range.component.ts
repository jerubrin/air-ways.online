import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { DateFormatType } from '../../types/DateFormatType';
import { dateRangeValidator } from '../../validators/dateRangeValidator';
import { minDateValidator } from '../../validators/minDateValidator';

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss']
})
export class DatepickerRangeComponent implements OnInit, OnDestroy {
  @Input() departureDateInitialValue!: Date | null;

  @Input() returnDateInitialValue!: Date | null;

  @Output() validDateRange: EventEmitter<{ departureDate: Date; returnDate: Date }> =
    new EventEmitter();

  minDate: Date = new Date();

  selectedDateFormat!: DateFormatType;

  departureDateControl!: FormControl;

  returnDateControl!: FormControl;

  departureDatepickerOpened = false;

  private subscriptions: Subscription[] = [];

  constructor(private dateFormatService: DateFormatService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.departureDateControl = new FormControl(this.departureDateInitialValue, [
      Validators.required,
      minDateValidator()
    ]);

    this.returnDateControl = new FormControl(this.returnDateInitialValue, [
      Validators.required,
      minDateValidator(),
      dateRangeValidator(this.departureDateControl?.value)
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
    const currentDepartureValue = this.departureDateControl.value;
    const currentReturnValue = this.returnDateControl.value;

    if (currentDepartureValue) {
      const formattedDepartureDate = this.formatDate(
        currentDepartureValue,
        this.selectedDateFormat
      );
      const inputDeparture = this.elementRef.nativeElement.querySelector(
        '.my-datepicker-input-departure'
      );
      if (inputDeparture) {
        inputDeparture.value = formattedDepartureDate;
      }
    }
    if (currentReturnValue) {
      const formattedReturnDate = this.formatDate(currentReturnValue, this.selectedDateFormat);
      const inputReturn = this.elementRef.nativeElement.querySelector(
        '.my-datepicker-input-return'
      );

      if (inputReturn) {
        inputReturn.value = formattedReturnDate;
      }
    }

    this.emitValidDateRange();
  }

  getDepartureFromErrorMessage(): string {
    if (this.departureDateControl.hasError('required')) {
      return 'Please enter the departure date';
    }
    if (this.departureDateControl.hasError('minDate')) {
      return 'Departure date must not be earlier than today';
    }
    if (this.returnDateControl.hasError('required')) {
      return 'Please enter the return date';
    }
    if (this.returnDateControl.hasError('minDate')) {
      return 'Return date must not be earlier than today';
    }
    if (this.returnDateControl.hasError('dateRange')) {
      return 'The return date must be after the departure date';
    }
    return '';
  }

  private formatDate(date: Date | null, format: string): string {
    return moment(date).format(format.replace('MM', 'M').replace('DD', 'D').replace('YYYY', 'Y'));
  }

  emitValidDateRange(): void {
    const departureDate = this.departureDateControl.value;
    const returnDate = this.returnDateControl.value;

    if (this.departureDateControl.valid && this.returnDateControl.valid) {
      this.validDateRange.emit({ departureDate, returnDate });
    }
  }
}
