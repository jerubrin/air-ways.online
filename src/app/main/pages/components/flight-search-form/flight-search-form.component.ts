import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map, Observable, startWith, Subscription } from 'rxjs';

import MockAirports from 'src/app/core/data/constants/MockAirports';
import RoutesPath from 'src/app/core/data/enams/RoutesPath';

import { Airport } from 'src/app/core/interfaces/Airport';
import { Passengers } from 'src/app/core/interfaces/Passengers';
import { SearchFlight } from 'src/app/core/interfaces/SearchFlight';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { DateFormatType } from 'src/app/core/types/DateFormatType';
import { PassengerType } from 'src/app/core/types/PassengerType';

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

  validation_msgs = {
    destinationsControl: {
      required: 'required',
      requiredMessage: 'Please enter the city',
      matchOption: 'matchOption',
      matchOptionMessage: 'City name not recognized. Click one of the autocomplete options'
    },
    departureDateControl: {
      required: 'required',
      requiredMessage: 'Please enter the departure date',
      minDate: 'minDate',
      minDateMessage: 'Departure date must not be earlier than today'
    },
    returnDateControl: {
      required: 'required',
      requiredMessage: 'Please enter the return date',
      minDate: 'minDate',
      minDateMessage: 'Return date must not be earlier than today',
      dateRange: 'dateRange',
      dateRangeMessage: 'The return date must be after the departure date'
    }
  };

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
      [this.fromWhereControlName]: ['', [Validators.required, this.autocompleteObjectValidator()]],
      [this.destinationControlName]: [
        '',
        [Validators.required, this.autocompleteObjectValidator()]
      ],
      [this.departureDateControlName]: [null, [Validators.required, this.minDateValidator()]],
      [this.returnDateControlName]: [
        null,
        [Validators.required, this.minDateValidator(), this.dateRangeValidator()]
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
          this.minDateValidator(),
          this.dateRangeValidator()
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

  private autocompleteObjectValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (typeof control.value === 'string') {
        const selectedOption = this.options.find(
          (option) => `${option.city} (${option.key})` === control.value
        );
        return selectedOption ? null : { matchOption: true };
      }
      return null;
    };
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

  private minDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = moment(control.value);
      const today = moment().startOf('day');
      if (selectedDate.isBefore(today)) {
        return { minDate: true };
      }
      return null;
    };
  }

  private dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const returnDate = moment(control.value);
      const departureDate = moment(this.searchForm?.get('departureDate')?.value);
      if (returnDate.isValid() && departureDate.isValid() && returnDate.isBefore(departureDate)) {
        return { dateRange: true };
      }
      return null;
    };
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
