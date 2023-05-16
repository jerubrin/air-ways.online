import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { QueryParamsService } from 'src/app/core/services/query-params.service';

import { Passengers } from 'src/app/shared/interfaces/passengers.model';
import { DatepickerRangeComponent } from '../../../shared/components/datepicker-range/datepicker-range.component';
import { DatepickerComponent } from '../../../shared/components/datepicker/datepicker.component';
import { DestinationFormFieldComponent } from '../../../shared/components/destination-form-field/destination-form-field.component';
import { PassengersFormFieldComponent } from '../../../shared/components/passengers-form-field/passengers-form-field.component';

@Component({
  selector: 'app-edit-flight-search-form',
  templateUrl: './edit-flight-search-form.component.html',
  styleUrls: ['./edit-flight-search-form.component.scss']
})
export class EditFlightSearchFormComponent implements OnInit, OnDestroy {
  @Input() showEditForm?: boolean;

  @ViewChild('fromWhere') fromWhereComponent!: DestinationFormFieldComponent;

  @ViewChild('destination') destinationComponent!: DestinationFormFieldComponent;

  @ViewChild(DatepickerRangeComponent) datepickerRange!: DatepickerRangeComponent;

  @ViewChild(DatepickerComponent) oneWayDatepicker!: DatepickerComponent;

  @ViewChild(PassengersFormFieldComponent) passengers!: PassengersFormFieldComponent;

  isRoundTrip!: boolean;

  fromWhereInitialValue!: string;

  toWhereInitialValue!: string;

  departureDateInitialValue!: Date | null;

  returnDateInitialValue!: Date | null;

  adultsInitialValue!: number;

  childrenInitialValue!: number;

  infantsInitialValue!: number;

  fromValue = '';

  destinationValue = '';

  forwardDateValue = '';

  forwardDateOneWayValue = '';

  returnDateValue = '';

  adultsValue = '1';

  childrenValue = '';

  infantsValue = '';

  private subscriptions: Subscription[] = [];

  constructor(private queryParamsService: QueryParamsService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.queryParamsService.queryParams$.subscribe((params) => {
        this.setInitialValuesFromQueryParams(params);
      })
    );
  }

  private setInitialValuesFromQueryParams(params: any): void {
    this.isRoundTrip = Boolean(params.backDate);

    this.fromWhereInitialValue =
      params.fromWhere && params.fromKey ? `${params.fromWhere} ${params.fromKey}` : '';
    this.toWhereInitialValue =
      params.toWhere && params.toKey ? `${params.toWhere} ${params.toKey}` : '';
    this.departureDateInitialValue = params.forwardDate ? new Date(params.forwardDate) : null;
    this.returnDateInitialValue = params.backDate ? new Date(params.backDate) : null;
    this.adultsInitialValue = params.adults ? Number(params.adults) : 1;
    this.childrenInitialValue = params.children ? Number(params.children) : 0;
    this.infantsInitialValue = params.infants ? Number(params.infants) : 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onValidValueFrom(value: string): void {
    this.fromValue = value;

    const [city, key] = this.fromValue.split(' ');
    this.queryParamsService.updateQueryParamOnCurrentPage({ fromWhere: city, fromKey: key });
  }

  onValidValueDestination(value: string): void {
    this.destinationValue = value;
    const [city, key] = this.destinationValue.split(' ');
    this.queryParamsService.updateQueryParamOnCurrentPage({ toWhere: city, toKey: key });
  }

  onValidDateRange(dateRange: { departureDate: Date; returnDate: Date }): void {
    this.forwardDateValue = moment(dateRange.departureDate).format();
    this.returnDateValue = moment(dateRange.returnDate).format();

    this.queryParamsService.updateQueryParamOnCurrentPage({
      forwardDate: this.forwardDateValue,
      backDate: this.returnDateValue
    });
  }

  onValidDate(date: Date): void {
    this.forwardDateOneWayValue = moment(date).format();

    this.queryParamsService.updateQueryParamOnCurrentPage({
      forwardDate: moment(this.forwardDateOneWayValue).format(),
      backDate: ''
    });
  }

  onPassengerCountChanged(passengerCount: Passengers): void {
    const { adults, children, infants } = passengerCount;
    this.adultsValue = adults.toString();
    this.childrenValue = children.toString();
    this.infantsValue = infants.toString();

    this.queryParamsService.updateQueryParamOnCurrentPage({
      adults: this.adultsValue,
      children: this.childrenValue,
      infants: this.infantsValue
    });
  }

  isFormValid(): boolean {
    if (this.isRoundTrip) {
      return (
        this.fromWhereComponent.destinationControl.valid &&
        this.destinationComponent.destinationControl.valid &&
        this.datepickerRange.departureDateControl.valid &&
        this.datepickerRange.returnDateControl.valid
      );
    }
    if (!this.isRoundTrip) {
      return (
        this.fromWhereComponent.destinationControl.valid &&
        this.destinationComponent.destinationControl.valid &&
        this.oneWayDatepicker.departureDateControl.valid
      );
    }
    return false;
  }

  onSubmit(): void {
    // if (!this.isFormValid()) {}
    // NOTE - в сервисе bookingPage добавить флаг
  }
}
