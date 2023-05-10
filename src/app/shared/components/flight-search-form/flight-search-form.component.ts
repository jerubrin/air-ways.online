import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith, Subscription } from 'rxjs';

import MockAirports from 'src/app/shared/data/constants/MockAirports';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

import { Airport } from 'src/app/shared/interfaces/airport.model';
import { Passengers } from 'src/app/shared/interfaces/passengers.model';
import { FlightSearch } from 'src/app/shared/interfaces/flight-search.model';
import { DateFormatType } from 'src/app/shared/types/DateFormatType';

import { FlightSearchService } from 'src/app/core/services/flight-search.service';
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

  typeOfFlightsControlInitialValue = 'roundTrip';

  passengerCountsInitialValues: Passengers = {
    adults: 1,
    children: 0,
    infants: 0
  };

  fromWhereInitialValue = '';

  destinationInitialValue = '';

  today: Date = new Date();

  weekLater = new Date(new Date().setDate(new Date().getDate() + 7));

  // filteredOptionsFromWhere!: Observable<Airport[]>;

  // filteredOptionsDestination!: Observable<Airport[]>;

  selectedDateFormat!: DateFormatType;

  options: Airport[] = MockAirports;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private flightSearchService: FlightSearchService
  ) {}

  ngOnInit(): void {
    this.createForm();

    // this.filteredOptionsFromWhere = this.fromWhereControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this.filterCities(value || ''))
    // );
    // this.filteredOptionsDestination = this.destinationControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this.filterCities(value || ''))
    // );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private createForm(): void {
    this.searchForm = this.fb.group({
      typeOfFlights: [this.typeOfFlightsControlInitialValue]
    });

    this.typeOfFlightsControl = this.searchForm.get('typeOfFlights') as FormControl;
  }

  isRoundTrip(): boolean {
    return this.typeOfFlightsControl.value === 'roundTrip';
  }

  isOneWay(): boolean {
    return this.typeOfFlightsControl.value === 'oneWay';
  }

  // private filterCities(value: string): Airport[] {
  //   if (typeof value === 'string') {
  //     return this.options.filter((opt) => opt.city.toLowerCase().includes(value.toLowerCase()));
  //   }
  //   return this.options;
  // }

  switchDestinationsFields() {
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
