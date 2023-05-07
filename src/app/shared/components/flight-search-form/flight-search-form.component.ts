import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map, Observable, startWith, Subscription } from 'rxjs';

import MockAirports from 'src/app/shared/data/constants/MockAirports';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

import { Airport } from 'src/app/shared/interfaces/Airport';
import { Passengers } from 'src/app/shared/interfaces/Passengers';
import { SearchFlight } from 'src/app/shared/interfaces/SearchFlight';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { DateFormatType } from 'src/app/shared/types/DateFormatType';
import { PassengerType } from 'src/app/shared/types/PassengerType';
import { minDateValidator } from '../../validators/minDateValidator';
import { dateRangeValidator } from '../../validators/dateRangeValidator';
import { autocompleteObjectValidator } from '../../validators/autocompleteObjectValidator';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss']
})
export class FlightSearchFormComponent implements OnInit, OnDestroy {
  today: Date = new Date();

  passengerCountsInitialValues: Passengers = {
    adults: 1,
    children: 0,
    infants: 0
  };

  searchForm!: FormGroup;

  typeOfFlightsControl!: FormControl;

  typeOfFlightsControlName = 'typeOfFlights';

  typeOfFlightsControlInitialValue = 'roundTrip';

  fromWhereControl!: FormControl;

  fromWhereControlName = 'fromWhere';

  destinationControl!: FormControl;

  destinationControlName = 'destination';

  departureDateControl!: FormControl;

  departureDateControlName = 'departureDate';

  returnDateControl!: FormControl;

  returnDateControlName = 'returnDate';

  passengerCountsFormGroup!: FormGroup;

  passengerCountsFormGroupName = 'passengerCounts';

  adultsControl!: FormControl;

  adultsControlName = 'adults';

  childrenControl!: FormControl;

  childrenControlName = 'children';

  infantsControl!: FormControl;

  infantsControlName = 'infants';

  filteredOptionsFromWhere!: Observable<Airport[]>;

  filteredOptionsDestination!: Observable<Airport[]>;

  selectedDateFormat!: DateFormatType;

  private options: Airport[] = MockAirports;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private router: Router,
    private dateFormatService: DateFormatService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.subscriptions.push(
      this.dateFormatService.selectedDateFormat$.subscribe((value) => {
        this.selectedDateFormat = value;
        this.onDateChanged();
      })
    );

    this.filteredOptionsFromWhere = this.fromWhereControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCities(value || ''))
    );
    this.filteredOptionsDestination = this.destinationControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCities(value || ''))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private createForm(): void {
    this.searchForm = this.fb.group({
      [this.typeOfFlightsControlName]: [this.typeOfFlightsControlInitialValue],
      [this.fromWhereControlName]: [
        '',
        [Validators.required, autocompleteObjectValidator(this.options)]
      ],
      [this.destinationControlName]: [
        '',
        [Validators.required, autocompleteObjectValidator(this.options)]
      ],
      [this.departureDateControlName]: [null, [Validators.required, minDateValidator()]],
      [this.returnDateControlName]: [
        null,
        [
          Validators.required,
          minDateValidator(),
          dateRangeValidator(this.searchForm?.get(this.departureDateControlName)?.value)
        ]
      ],
      [this.passengerCountsFormGroupName]: this.fb.group({
        [this.adultsControlName]: [
          this.passengerCountsInitialValues.adults,
          [Validators.required, Validators.min(1), Validators.max(10)]
        ],
        [this.childrenControlName]: [
          this.passengerCountsInitialValues.children,
          [Validators.required, Validators.min(0), Validators.max(10)]
        ],
        [this.infantsControlName]: [
          this.passengerCountsInitialValues.infants,
          [Validators.required, Validators.min(0), Validators.max(10)]
        ]
      })
    });

    this.typeOfFlightsControl = this.searchForm.get(this.typeOfFlightsControlName) as FormControl;
    this.fromWhereControl = this.searchForm.get(this.fromWhereControlName) as FormControl;
    this.destinationControl = this.searchForm.get(this.destinationControlName) as FormControl;
    this.departureDateControl = this.searchForm.get(this.departureDateControlName) as FormControl;
    this.returnDateControl = this.searchForm.get(this.returnDateControlName) as FormControl;
    this.passengerCountsFormGroup = this.searchForm.get(
      this.passengerCountsFormGroupName
    ) as FormGroup;
    this.adultsControl = this.passengerCountsFormGroup.get(this.adultsControlName) as FormControl;
    this.childrenControl = this.passengerCountsFormGroup.get(
      this.childrenControlName
    ) as FormControl;
    this.infantsControl = this.passengerCountsFormGroup.get(this.infantsControlName) as FormControl;

    this.subscriptions.push(
      this.typeOfFlightsControl.valueChanges.subscribe((value) => {
        this.departureDateControl.setValue(null, { emitEvent: false });
        this.returnDateControl.setValue(null, { emitEvent: false });
        this.departureDateControl.markAsUntouched();
        this.returnDateControl.markAsUntouched();

        const validators: ValidatorFn[] = [
          Validators.required,
          minDateValidator(),
          dateRangeValidator(this.departureDateControl.value)
        ];
        if (value === 'roundTrip') {
          this.returnDateControl.setValidators(validators);
        } else {
          this.returnDateControl.clearValidators();
        }
        this.returnDateControl.updateValueAndValidity();
      })
    );
  }

  isRoundTrip() {
    return this.typeOfFlightsControl.value === 'roundTrip';
  }

  isOneWay() {
    return this.typeOfFlightsControl.value === 'oneWay';
  }

  displayCityFn(city: Airport): string {
    return city.city ? `${city.city} ${city.key}` : '';
  }

  private filterCities(value: string): Airport[] {
    if (typeof value === 'string') {
      return this.options.filter((opt) => opt.city.toLowerCase().includes(value.toLowerCase()));
    }
    return this.options;
  }

  switchDestinationsFields() {
    const fromWhereValue = this.fromWhereControl.value;
    const destinationValue = this.destinationControl.value;
    this.fromWhereControl.setValue(destinationValue);
    this.destinationControl.setValue(fromWhereValue);
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
  }

  private formatDate(date: Date | null, format: string): string {
    return moment(date).format(format.replace('MM', 'M').replace('DD', 'D').replace('YYYY', 'Y'));
  }

  displayPassengerCount(): string {
    const adults = this.adultsControl.value;
    const children = this.childrenControl.value;
    const infants = this.infantsControl.value;
    return `${adults} Adult ${children} Child ${infants} Infant`;
  }

  incrementPassengersCount(type: PassengerType): void {
    const currentCount = this.passengerCountsFormGroup.value[type];
    if (currentCount < 10) {
      this.passengerCountsFormGroup.controls[type].setValue(
        this.passengerCountsFormGroup.controls[type].value + 1
      );
    }
  }

  decrementPassengersCount(type: PassengerType): void {
    const currentCount = this.passengerCountsFormGroup.value[type];
    if (currentCount === 0) {
      return;
    }
    this.passengerCountsFormGroup.controls[type].setValue(
      this.passengerCountsFormGroup.controls[type].value - 1
    );
  }

  onMenuItemClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const { fromWhere, destination, departureDate, returnDate, passengerCounts } =
      this.searchForm.value;

    const searchFlight: SearchFlight = {
      fromKey: fromWhere.key,
      toKey: destination.key,
      forwardDate: new Date(departureDate).toISOString(),
      backDate: new Date(returnDate).toISOString(),
      passengers: passengerCounts
    };

    this.router.navigate([RoutesPath.BookingPage]);
  }
}
