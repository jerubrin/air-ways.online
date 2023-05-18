import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { DatepickerRangeComponent } from 'src/app/shared/components/datepicker-range/datepicker-range.component';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { DestinationFormFieldComponent } from 'src/app/shared/components/destination-form-field/destination-form-field.component';
import { PassengersFormFieldComponent } from 'src/app/shared/components/passengers-form-field/passengers-form-field.component';
import { Passengers } from 'src/app/shared/interfaces/passengers.model';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss']
})
export class FlightSearchFormComponent implements OnInit, OnDestroy {
  @ViewChild('fromWhere') fromWhereComponent!: DestinationFormFieldComponent;

  @ViewChild('destination') destinationComponent!: DestinationFormFieldComponent;

  @ViewChild(DatepickerRangeComponent) datepickerRange!: DatepickerRangeComponent;

  @ViewChild(DatepickerComponent) oneWayDatepicker!: DatepickerComponent;

  @ViewChild(PassengersFormFieldComponent) passengers!: PassengersFormFieldComponent;

  typeOfFlightsControl!: FormControl;

  typeOfFlightsInitialValue!: 'roundTrip' | 'oneWay';

  fromWhereInitialValue!: string;

  toWhereInitialValue!: string;

  departureDateInitialValue!: Date | null;

  returnDateInitialValue!: Date | null;

  adultsInitialValue!: number;

  childrenInitialValue!: number;

  infantsInitialValue!: number;

  private fromValue = '';

  private destinationValue = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private queryParamsService: QueryParamsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((currentParams) => {
        if (Object.keys(currentParams).length === 0) {
          this.queryParamsService.setInitialQueryParams();
        }
        this.setInitialValuesFromQueryParams(currentParams);
      })
    );
  }

  private setInitialValuesFromQueryParams(params: any): void {
    this.typeOfFlightsInitialValue = params.backDate ? 'roundTrip' : 'oneWay';
    this.fromWhereInitialValue =
      params.fromWhere && params.fromKey ? `${params.fromWhere} ${params.fromKey}` : '';
    this.toWhereInitialValue =
      params.toWhere && params.toKey ? `${params.toWhere} ${params.toKey}` : '';
    this.departureDateInitialValue = params.forwardDate ? new Date(params.forwardDate) : null;
    this.returnDateInitialValue = params.backDate ? new Date(params.backDate) : null;
    this.adultsInitialValue = params.adults ? Number(params.adults) : 1;
    this.childrenInitialValue = params.children ? Number(params.children) : 0;
    this.infantsInitialValue = params.infants ? Number(params.infants) : 0;
    this.typeOfFlightsControl = new FormControl(this.typeOfFlightsInitialValue);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  handleValidValueFrom(value: string): void {
    this.fromValue = value;
    const [city, key] = value.split(' ');
    this.queryParamsService.updateQueryParamOnCurrentPage({ fromWhere: city, fromKey: key });
  }

  handleValidValueDestination(value: string): void {
    this.destinationValue = value;
    const [city, key] = value.split(' ');
    this.queryParamsService.updateQueryParamOnCurrentPage({ toWhere: city, toKey: key });
  }

  onValidDateRange(dateRange: { departureDate: Date; returnDate: Date }): void {
    this.queryParamsService.updateQueryParamOnCurrentPage({
      forwardDate: moment(dateRange.departureDate).format(),
      backDate: moment(dateRange.returnDate).format()
    });
  }

  onValidDate(date: Date): void {
    this.queryParamsService.updateQueryParamOnCurrentPage({
      forwardDate: moment(date).format(),
      backDate: ''
    });
  }

  onPassengerCountChanged(passengerCount: Passengers): void {
    const { adults, children, infants } = passengerCount;
    this.queryParamsService.updateQueryParamOnCurrentPage({
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString()
    });
  }

  isRoundTrip(): boolean {
    return this.typeOfFlightsControl.value === 'roundTrip';
  }

  isOneWay(): boolean {
    return this.typeOfFlightsControl.value === 'oneWay';
  }

  switchDestinationsFields(): void {
    if (!this.fromValue || !this.destinationValue) {
      return;
    }
    this.fromWhereComponent.destinationControl.setValue(this.destinationValue);
    this.destinationComponent.destinationControl.setValue(this.fromValue);
    this.fromWhereComponent.isOptionSelected = true;
    this.destinationComponent.isOptionSelected = true;
  }

  isFormValid(): boolean {
    if (this.isRoundTrip()) {
      return (
        this.fromWhereComponent.destinationControl.valid &&
        this.destinationComponent.destinationControl.valid &&
        this.datepickerRange.departureDateControl.valid &&
        this.datepickerRange.returnDateControl.valid
      );
    }
    if (this.isOneWay()) {
      return (
        this.fromWhereComponent.destinationControl.valid &&
        this.destinationComponent.destinationControl.valid &&
        this.oneWayDatepicker.departureDateControl.valid
      );
    }
    return false;
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    const queryParams = this.queryParamsService.getQueryParams();

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageFlights}`], {
      queryParams
    });
  }
}
