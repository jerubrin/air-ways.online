import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Passengers } from '../../interfaces/passengers.model';
import { PassengerType } from '../../types/PassengerType';

@Component({
  selector: 'app-passengers-form-field',
  templateUrl: './passengers-form-field.component.html',
  styleUrls: ['./passengers-form-field.component.scss']
})
export class PassengersFormFieldComponent {
  @Input() initialValues!: Passengers;

  passengerCountsFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.passengerCountsFormGroup = this.fb.group({
      adults: [
        this.initialValues.adults,
        [Validators.required, Validators.min(1), Validators.max(10)]
      ],
      children: [
        this.initialValues.children,
        [Validators.required, Validators.min(0), Validators.max(10)]
      ],
      infants: [
        this.initialValues.infants,
        [Validators.required, Validators.min(0), Validators.max(10)]
      ]
    });
  }

  displayPassengerCount(): string {
    const adults = this.passengerCountsFormGroup?.get('adults')?.value;
    const children = this.passengerCountsFormGroup?.get('children')?.value;
    const infants = this.passengerCountsFormGroup?.get('infants')?.value;

    return `${adults} Adult ${children} Child ${infants} Infant`;
  }

  incrementPassengersCount(type: PassengerType): void {
    const currentCount = this.passengerCountsFormGroup.value[type];
    if (currentCount < 10) {
      this.passengerCountsFormGroup.controls[type].setValue(
        this.passengerCountsFormGroup.controls[type].value + 1,
        { emitEvent: false }
      );
    }
  }

  decrementPassengersCount(type: PassengerType): void {
    const currentCount = this.passengerCountsFormGroup.value[type];
    if (currentCount === 0) {
      return;
    }
    this.passengerCountsFormGroup.controls[type].setValue(
      this.passengerCountsFormGroup.controls[type].value - 1,
      { emitEvent: false }
    );
  }

  onMenuItemClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
