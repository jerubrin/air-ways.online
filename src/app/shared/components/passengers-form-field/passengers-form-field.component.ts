import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassengerType } from '../../types/PassengerType';

@Component({
  selector: 'app-passengers-form-field',
  templateUrl: './passengers-form-field.component.html',
  styleUrls: ['./passengers-form-field.component.scss']
})
export class PassengersFormFieldComponent implements OnInit {
  @Input() adultsInitialValue!: number;

  @Input() childrenInitialValue!: number;

  @Input() infantsInitialValue!: number;

  passengerCountsFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.passengerCountsFormGroup = this.fb.group({
      adults: [
        this.adultsInitialValue,
        [Validators.required, Validators.min(1), Validators.max(10)]
      ],
      children: [
        this.childrenInitialValue,
        [Validators.required, Validators.min(0), Validators.max(10)]
      ],
      infants: [
        this.infantsInitialValue,
        [Validators.required, Validators.min(0), Validators.max(10)]
      ]
    });
  }

  displayPassengerCount(): string {
    const adults = this.passengerCountsFormGroup?.get('adults')?.value;
    const children = this.passengerCountsFormGroup?.get('children')?.value;
    const infants = this.passengerCountsFormGroup?.get('infants')?.value;

    let passengerCount = `${adults} Adult`;

    if (children > 0) {
      passengerCount += ` ${children} Child`;
    }

    if (infants > 0) {
      passengerCount += ` ${infants} Infant`;
    }

    return passengerCount;
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

  closeMenu(): void {
    this.passengerCountsFormGroup.markAsDirty();
    this.passengerCountsFormGroup.updateValueAndValidity();
  }
}
