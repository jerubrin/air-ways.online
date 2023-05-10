import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import MockAirports from '../../data/constants/MockAirports';
import { Airport } from '../../interfaces/airport.model';
import { Passengers } from '../../interfaces/passengers.model';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { DestinationFormFieldComponent } from '../destination-form-field/destination-form-field.component';
import { PassengersFormFieldComponent } from '../passengers-form-field/passengers-form-field.component';

@Component({
  selector: 'app-edit-flight-search-form',
  templateUrl: './edit-flight-search-form.component.html',
  styleUrls: ['./edit-flight-search-form.component.scss']
})
export class EditFlightSearchFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('fromWhere') fromWhere!: DestinationFormFieldComponent;

  @ViewChild('destination') destination!: DestinationFormFieldComponent;

  @ViewChild(DatepickerComponent) datepicker!: DatepickerComponent;

  @ViewChild(PassengersFormFieldComponent) passengersForm!: PassengersFormFieldComponent;

  editSearchForm!: FormGroup;

  fromWhereInitialValue = '';

  destinationInitialValue = '';

  passengerCountsInitialValues: Passengers = {
    adults: 2,
    children: 0,
    infants: 0
  };

  forwardDateInitialValues: Date = new Date();

  options: Airport[] = MockAirports;

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit(): void {
    // this.editSearchForm.addControl('fromWhere', this.datepicker.dateControl);
    // this.editSearchForm.addControl('passengerCounts', this.passengersForm.passengerCountsFormGroup);
    // this.subscriptions.push(
    //   this.datepicker.dateControl.valueChanges.subscribe((dateValue) => {
    //     console.log(dateValue);
    //   })
    // );
    // this.subscriptions.push(
    //   this.passengersForm.passengerCountsFormGroup.valueChanges.subscribe((formValue) => {
    //     this.editSearchForm.patchValue({ passengerCounts: formValue });
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  createForm() {
    this.editSearchForm = this.fb.group({});
  }

  onSubmit() {
    const forwardDate = this.datepicker.dateControl.value;
    const passengers = this.passengersForm.passengerCountsFormGroup.value;

    console.log(forwardDate);
    console.log(passengers);

    // console.log(this.editSearchForm.value);
  }
}
