import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import MockAirports from 'src/app/shared/data/constants/MockAirports';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { Airport } from 'src/app/shared/interfaces/airport.model';
import { FlightSearch } from 'src/app/shared/interfaces/flight-search.model';
import { DateFormatType } from 'src/app/shared/types/DateFormatType';
import { FlightSearchService } from 'src/app/core/services/flight-search.service';
import { Subscription, take } from 'rxjs';
import { PassengersFormFieldComponent } from '../passengers-form-field/passengers-form-field.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { DatepickerRangeComponent } from '../datepicker-range/datepicker-range.component';
import { DestinationFormFieldComponent } from '../destination-form-field/destination-form-field.component';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss']
})
export class FlightSearchFormComponent implements OnInit, OnDestroy {
  @ViewChild('fromWhere') fromWhere!: DestinationFormFieldComponent;

  @ViewChild('destination') destination!: DestinationFormFieldComponent;

  @ViewChild(DatepickerRangeComponent) datepickerRange!: DatepickerRangeComponent;

  @ViewChild(DatepickerComponent) oneWayDatepicker!: DatepickerComponent;

  @ViewChild(PassengersFormFieldComponent) passengers!: PassengersFormFieldComponent;

  searchForm!: FormGroup;

  typeOfFlightsControl!: FormControl;

  selectedDateFormat!: DateFormatType;

  options: Airport[] = MockAirports;

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
    private flightSearchService: FlightSearchService
  ) {}

  ngOnInit(): void {
    this.createForm();

    const { queryParams } = this.activatedRoute.snapshot;

    this.subscriptions.push(
      this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
        // console.log(params);
        this.setInitialValuesFromQueryParams(params);
      })
    );

    this.setInitialValuesFromQueryParams(queryParams);
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
            this.updateQueryParam('fromKey', value.key);
          }
        })
      );
    }
    if (this.destination) {
      this.subscriptions.push(
        this.destination.destinationControl.valueChanges.subscribe((value) => {
          if (this.destination.destinationControl.valid) {
            this.destination.destinationControl.markAsTouched();
            this.updateQueryParam('toKey', value.key);
          }
        })
      );
    }
  }

  private setInitialValuesFromQueryParams(params: { [x: string]: any }): void {
    this.fromWhereInitialValue = params['fromKey'] || '';
    this.toWhereInitialValue = params['toKey'] || '';
    this.departureDateInitialValue = params['forwardDate'] ? new Date(params['forwardDate']) : null;
    this.returnDateInitialValue = params['backDate'] ? new Date(params['backDate']) : null;
    this.adultsInitialValue = parseInt(params['adults'], 10) || 1;
    this.childrenInitialValue = parseInt(params['children'], 10) || 0;
    this.infantsInitialValue = parseInt(params['infants'], 10) || 0;
  }

  private updateQueryParam(param: string, value: any): void {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((params) => {
        const queryParams = { ...params };
        if (queryParams[param]) {
          queryParams[param] = value;
        } else {
          queryParams[param] = value;
        }
        this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
      })
    );
  }

  private createForm(): void {
    this.searchForm = this.fb.group({
      typeOfFlights: ['roundTrip']
    });

    this.typeOfFlightsControl = this.searchForm.get('typeOfFlights') as FormControl;
  }

  isRoundTrip(): boolean {
    return this.typeOfFlightsControl.value === 'roundTrip';
  }

  isOneWay(): boolean {
    return this.typeOfFlightsControl.value === 'oneWay';
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
        this.typeOfFlightsControl.valid &&
        this.fromWhere.destinationControl.valid &&
        this.destination.destinationControl.valid &&
        this.datepickerRange.departureDateControl.valid &&
        this.datepickerRange.returnDateControl.valid &&
        this.passengers.passengerCountsFormGroup.valid
      );
    }
    if (this.isOneWay()) {
      return (
        this.typeOfFlightsControl.valid &&
        this.fromWhere.destinationControl.valid &&
        this.destination.destinationControl.valid &&
        this.oneWayDatepicker.dateControl.valid &&
        this.passengers.passengerCountsFormGroup.valid
      );
    }
    return false;
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    if (this.isRoundTrip()) {
      const queryParams: FlightSearch = {
        fromKey: this.fromWhere.destinationControl.value.key,
        toKey: this.destination.destinationControl.value.key,
        forwardDate: new Date(this.datepickerRange.departureDateControl.value).toISOString(),
        backDate: new Date(this.datepickerRange.returnDateControl.value).toISOString(),
        adults: this.passengers.passengerCountsFormGroup.value.adults,
        children: this.passengers.passengerCountsFormGroup.value.children,
        infants: this.passengers.passengerCountsFormGroup.value.infants
      };

      this.flightSearchService.updateFlightSearchParams(queryParams);
      this.flightSearchService.updateFormState(this.searchForm);

      this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageFlights}`], {
        queryParams,
        queryParamsHandling: 'merge'
      });
    }
    if (this.isOneWay()) {
      const queryParams: FlightSearch = {
        fromKey: this.fromWhere.destinationControl.value.key,
        toKey: this.destination.destinationControl.value.key,
        forwardDate: new Date(this.oneWayDatepicker.dateControl.value).toISOString(),
        adults: this.passengers.passengerCountsFormGroup.value.adults,
        children: this.passengers.passengerCountsFormGroup.value.children,
        infants: this.passengers.passengerCountsFormGroup.value.infants
      };

      this.flightSearchService.updateFlightSearchParams(queryParams);

      this.flightSearchService.updateFormState(this.searchForm);

      this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageFlights}`], {
        queryParams,
        queryParamsHandling: 'merge'
      });
    }
  }
}
