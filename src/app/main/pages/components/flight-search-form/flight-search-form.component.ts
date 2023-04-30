import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import * as moment from 'moment';
import { map, Observable, startWith } from 'rxjs';
import MockAirports from 'src/app/core/data/constants/MockAirports';
import RoutesPath from 'src/app/core/data/enams/RoutesPath';

import { Airport } from 'src/app/core/interfaces/Airport';
import { Passengers } from 'src/app/core/interfaces/Passengers';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss'],
})
export class FlightSearchFormComponent implements OnInit {
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

  passengerCountsFormGroupName = 'passengerCountsForm';

  adultsControl!: FormControl;

  adultsControlName = 'adults';

  childrenControl!: FormControl;

  childrenControlName = 'children';

  infantsControl!: FormControl;

  infantsControlName = 'infants';

  filteredOptionsFromWhere!: Observable<Airport[]>;

  filteredOptionsDestination!: Observable<Airport[]>;

  // FIXME take from the future store
  // eslint-disable-next-line operator-linebreak
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY/DD/MM' | 'YYYY/MM/DD' =
    'MM/DD/YYYY';

  today = new Date();

  weekLater = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate() + 7
  );

  passengerCountsInitialValues: Passengers = {
    adults: 1,
    children: 0,
    infants: 0,
  };

  validation_msgs = {
    destinationsControl: {
      required: 'required',
      requiredMessage: 'Please enter the city',
      matchOption: 'matchOption',
      matchOptionMessage:
        'City name not recognized. Click one of the autocomplete options',
    },
    departureDateControl: {
      required: 'required',
      requiredMessage: 'Please enter the departure date',
      minDate: 'minDate',
      minDateMessage: 'Departure date must not be earlier than today',
    },
    returnDateControl: {
      required: 'required',
      requiredMessage: 'Please enter the return date',
      minDate: 'minDate',
      minDateMessage: 'Return date must not be earlier than today',
      dateRange: 'dateRange',
      dateRangeMessage: 'The return date must be after the departure date',
    },
  };

  private options: Airport[] = MockAirports;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.createForm();

    this.filteredOptionsFromWhere = this.fromWhereControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCities(value || ''))
    );

    this.filteredOptionsDestination = this.destinationControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterCities(value || ''))
    );
  }

  private createForm(): void {
    this.searchForm = this.fb.group({
      [this.typeOfFlightsControlName]: [this.typeOfFlightsControlInitialValue],
      [this.fromWhereControlName]: [
        '',
        [Validators.required, this.autocompleteObjectValidator()],
      ],
      [this.destinationControlName]: [
        '',
        [Validators.required, this.autocompleteObjectValidator()],
      ],
      [this.departureDateControlName]: [
        this.today,
        [Validators.required, this.minDateValidator()],
      ],
      [this.returnDateControlName]: [
        this.weekLater,
        [
          Validators.required,
          this.minDateValidator(),
          this.dateRangeValidator(),
        ],
      ],

      [this.passengerCountsFormGroupName]: this.fb.group({
        [this.adultsControlName]: [
          this.passengerCountsInitialValues.adults,
          [Validators.required, Validators.min(1), Validators.max(10)],
        ],
        [this.childrenControlName]: [
          this.passengerCountsInitialValues.children,
          [Validators.required, Validators.min(0), Validators.max(10)],
        ],
        [this.infantsControlName]: [
          this.passengerCountsInitialValues.infants,
          [Validators.required, Validators.min(0), Validators.max(10)],
        ],
      }),
    });

    this.fromWhereControl = this.searchForm.get(
      this.fromWhereControlName
    ) as FormControl;
    this.destinationControl = this.searchForm.get(
      this.destinationControlName
    ) as FormControl;
    this.departureDateControl = this.searchForm.get(
      this.departureDateControlName
    ) as FormControl;
    this.returnDateControl = this.searchForm.get(
      this.returnDateControlName
    ) as FormControl;
    this.typeOfFlightsControl = this.searchForm.get(
      this.typeOfFlightsControlName
    ) as FormControl;
    this.passengerCountsFormGroup = this.searchForm.get(
      this.passengerCountsFormGroupName
    ) as FormGroup;
    this.adultsControl = this.passengerCountsFormGroup.get(
      this.adultsControlName
    ) as FormControl;
    this.childrenControl = this.passengerCountsFormGroup.get(
      this.childrenControlName
    ) as FormControl;
    this.infantsControl = this.passengerCountsFormGroup.get(
      this.infantsControlName
    ) as FormControl;
  }

  get displayPassengerCount(): string {
    const adults = this.adultsControl.value;

    const children = this.childrenControl.value;

    const infants = this.infantsControl.value;

    return `${adults} Adult(s) ${children} Child(ren) ${infants} Infant(s)`;
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
      return this.options.filter(
        (option) =>
          // FIXME disable rule
          // eslint-disable-next-line implicit-arrow-linebreak
          option.city.toLowerCase().includes(value.toLowerCase())
        // FIXME disable rule
        // eslint-disable-next-line function-paren-newline
      );
    }
    return this.options;
  }

  private autocompleteObjectValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (typeof control.value === 'string') {
        const selectedOption = this.options.find(
          (option) => `${option.city} (${option.key})` === control.value
        );
        return selectedOption ? null : { matchOption: true };
      }
      return null;
    };
  }

  private minDateValidator(): { [key: string]: any } | null {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const { value } = control;
      if (value && value < this.today) {
        return { minDate: true };
      }
      return null;
    };
  }

  dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const returnDate = moment(control.value);
      const departureDate = moment(
        this.searchForm?.get('departureDate')?.value
      );

      if (
        // FIXME disable rule
        // eslint-disable-next-line operator-linebreak
        returnDate.isValid() &&
        // FIXME disable rule
        // eslint-disable-next-line operator-linebreak
        departureDate.isValid() &&
        returnDate.isBefore(departureDate)
      ) {
        return { dateRange: true };
      }

      return null;
    };
  }

  incrementPassengersCount(type: 'adults' | 'children' | 'infants'): void {
    const currentCount = this.passengerCountsFormGroup.value[type];

    if (currentCount < 10) {
      this.passengerCountsFormGroup.controls[type].setValue(
        this.passengerCountsFormGroup.controls[type].value + 1
      );
    }
  }

  decrementPassengersCount(type: 'adults' | 'children' | 'infants'): void {
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

  switchDestinationsFields() {
    const fromWhereValue = this.fromWhereControl.value;

    const destinationValue = this.destinationControl.value;

    this.fromWhereControl.setValue(destinationValue);
    this.destinationControl.setValue(fromWhereValue);
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }
    // FIXME disable rule
    // eslint-disable-next-line max-len
    console.log(this.searchForm.value);
    this.router.navigate([RoutesPath.BookingPage]);
  }
}

// FIXME might come in handy
// get fromWhereControl(): FormControl {
//   return this.searchForm?.get(this.fromWhereControlName) as FormControl;
// }

// get destinationControl(): FormControl {
//   return this.searchForm?.get(this.destinationControlName) as FormControl;
// }

// get typeOfFlightsControl(): FormControl {
//   return this.searchForm?.get(this.typeOfFlightsControlName) as FormControl;
// }

// get dateRangeFormGroup(): FormGroup {
//   return this.searchForm?.get('dateRangeForm') as FormGroup;
// }

// get dateRangeStartControl(): FormControl {
//   return this.dateRangeFormGroup?.get(
//     this.dateRangeStartControlName
//   ) as FormControl;
// }

// get dateRangeEndControl(): FormControl {
//   return this.dateRangeFormGroup?.get(
//     this.dateRangeEndControlName
//   ) as FormControl;
// }

// get departureDateControl(): FormControl {
//   return this.searchForm?.get('departureDate') as FormControl;
// }

// get passengerCountsFormGroup(): FormGroup {
//   return this.searchForm?.get('passengerCountsForm') as FormGroup;
// }

// get adultsControl(): FormControl {
//   return this.passengerCountsFormGroup.get(
//     this.adultsControlName
//   ) as FormControl;
// }

// get adultsControlName(): FormControl {
//   return this.passengerCountsFormGroup.get(
//     this.childrenControlName
//   ) as FormControl;
// }

// get infantsControl(): FormControl {
//   return this.passengerCountsFormGroup.get(
//     this.infantsControlName
//   ) as FormControl;
// }
