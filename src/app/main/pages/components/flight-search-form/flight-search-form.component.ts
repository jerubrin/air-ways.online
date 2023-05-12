import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { DateFormatType } from 'src/app/shared/types/DateFormatType';
import { combineLatest, Subscription, take } from 'rxjs';
import * as moment from 'moment';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { DatepickerRangeComponent } from 'src/app/shared/components/datepicker-range/datepicker-range.component';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { DestinationFormFieldComponent } from 'src/app/shared/components/destination-form-field/destination-form-field.component';
import { PassengersFormFieldComponent } from 'src/app/shared/components/passengers-form-field/passengers-form-field.component';
import { QueryParams } from 'src/app/shared/interfaces/query-params.model';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss']
})
export class FlightSearchFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('fromWhere') fromWhere!: DestinationFormFieldComponent;

  @ViewChild('destination') destination!: DestinationFormFieldComponent;

  @ViewChild(DatepickerRangeComponent) datepickerRange!: DatepickerRangeComponent;

  @ViewChild(DatepickerComponent) oneWayDatepicker!: DatepickerComponent;

  @ViewChild(PassengersFormFieldComponent) passengers!: PassengersFormFieldComponent;

  searchForm!: FormGroup;

  passengerCountsFormGroup!: FormGroup;

  selectedDateFormat!: DateFormatType;

  typeOfFlightsInitialValue = 'roundTrip';

  fromWhereInitialValue!: string;

  toWhereInitialValue!: string;

  departureDateInitialValue!: Date | null;

  returnDateInitialValue!: Date | null;

  adultsInitialValue!: number;

  childrenInitialValue!: number;

  infantsInitialValue!: number;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private queryParamsService: QueryParamsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
        if (
          !this.queryParamsService.hasQueryParams([
            'fromKey',
            'toKey',
            'forwardDate',
            'backDate',
            'adults',
            'children',
            'infants'
          ])
        ) {
          this.queryParamsService.setInitialQueryParams();
        }
        this.setInitialValuesFromQueryParams(params);
        this.searchForm = this.fb.group({
          typeOfFlights: [this.typeOfFlightsInitialValue]
        });
      })
    );
  }

  private setInitialValuesFromQueryParams(params: any): void {
    this.typeOfFlightsInitialValue = params.backDate ? 'roundTrip' : 'oneWay';

    this.fromWhereInitialValue = params.fromWhere || '';
    this.toWhereInitialValue = params.toWhere || '';
    this.departureDateInitialValue = params.forwardDate ? new Date(params.forwardDate) : null;
    this.returnDateInitialValue = params.backDate ? new Date(params.backDate) : null;
    this.adultsInitialValue = params.adults ? Number(params.adults) : 1;
    this.childrenInitialValue = params.children ? Number(params.children) : 0;
    this.infantsInitialValue = params.infants ? Number(params.infants) : 0;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    if (this.fromWhere) {
      this.subscriptions.push(
        this.fromWhere.destinationControl.valueChanges.subscribe((value) => {
          if (this.fromWhere.destinationControl.valid) {
            this.fromWhere.destinationControl.markAsTouched();
            this.queryParamsService.updateQueryParam({ fromWhere: value.city, fromKey: value.key });
          }
        })
      );
    }
    if (this.destination) {
      this.subscriptions.push(
        this.destination.destinationControl.valueChanges.subscribe((value) => {
          if (this.destination.destinationControl.valid) {
            this.destination.destinationControl.markAsTouched();
            this.queryParamsService.updateQueryParam({ toWhere: value.city, toKey: value.key });
          }
        })
      );
    }
    if (this.datepickerRange) {
      this.subscriptions.push(
        combineLatest([
          this.datepickerRange.departureDateControl.valueChanges,
          this.datepickerRange.returnDateControl.valueChanges
        ]).subscribe(([departureValue, returnValue]) => {
          if (
            this.datepickerRange.departureDateControl.valid &&
            this.datepickerRange.returnDateControl.valid
          ) {
            this.datepickerRange.departureDateControl.markAsTouched();
            this.datepickerRange.returnDateControl.markAsTouched();
            this.queryParamsService.updateQueryParam({
              forwardDate: moment(departureValue).format(),
              backDate: moment(returnValue).format()
            });
          }
        })
      );
    }

    if (this.oneWayDatepicker) {
      this.subscriptions.push(
        this.oneWayDatepicker.dateControl.valueChanges.subscribe((value) => {
          if (this.oneWayDatepicker.dateControl.valid) {
            this.oneWayDatepicker.dateControl.markAsTouched();
            this.queryParamsService.updateQueryParam({
              forwardDate: moment(value).format()
            });
          }
        })
      );
    }

    if (this.passengers) {
      this.subscriptions.push(
        this.passengers.passengerCountsFormGroup.valueChanges.subscribe((value) => {
          this.queryParamsService.updateQueryParam({
            adults: value.adults,
            children: value.children,
            infants: value.infants
          });
        })
      );
    }
  }

  isRoundTrip(): boolean {
    return this.searchForm?.get('typeOfFlights')?.value === 'roundTrip';
  }

  isOneWay(): boolean {
    return this.searchForm?.get('typeOfFlights')?.value === 'oneWay';
  }

  switchDestinationsFields(): void {
    const fromWhereValue = this.fromWhere.destinationControl.value;
    const destinationValue = this.destination.destinationControl.value;

    this.fromWhere.destinationControl.setValue(destinationValue);
    this.destination.destinationControl.setValue(fromWhereValue);
  }

  isFormValid(): boolean {
    if (this.isRoundTrip()) {
      return (
        this.fromWhere.destinationControl.valid &&
        this.destination.destinationControl.valid &&
        this.datepickerRange.departureDateControl.valid &&
        this.datepickerRange.returnDateControl.valid &&
        this.passengers.passengerCountsFormGroup.valid
      );
    }
    if (this.isOneWay()) {
      return (
        this.fromWhere.destinationControl.valid &&
        this.destination.destinationControl.valid &&
        this.oneWayDatepicker.dateControl.valid &&
        this.passengers.passengerCountsFormGroup.valid
      );
    }
    return false;
  }

  private getForwardDate(): string {
    return this.isRoundTrip()
      ? moment(this.datepickerRange.departureDateControl.value).format()
      : moment(this.oneWayDatepicker.dateControl.value).format();
  }

  private getBackDate(): string {
    return this.isRoundTrip() ? moment(this.datepickerRange.returnDateControl.value).format() : '';
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    const queryParamsNew: QueryParams = {
      fromWhere: this.fromWhere.destinationControl.value.city,
      toWhere: this.destination.destinationControl.value.city,
      fromKey: this.fromWhere.destinationControl.value.key,
      toKey: this.destination.destinationControl.value.key,
      forwardDate: this.getForwardDate(),
      backDate: this.getBackDate(),
      adults: this.passengers.passengerCountsFormGroup.value.adults,
      children: this.passengers.passengerCountsFormGroup.value.children,
      infants: this.passengers.passengerCountsFormGroup.value.infants
    };

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageFlights}`], {
      queryParams: queryParamsNew,
      queryParamsHandling: 'merge'
    });
  }
}
