import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Gender, PassengersData } from 'src/app/core/interfaces/passengers-data';
import dateOfBirthValidator from 'src/app/shared/validators/dateOfBirthValidator';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.scss']
})
export class PassengerFormComponent implements OnInit, OnDestroy {
  @Input() passengerTitle!: 'Adult' | 'Children' | 'Infant';

  @Input() initialValues!: PassengersData | null;

  @Input() passengerIndex!: number;

  @Output() passengerFormChanges = new EventEmitter<{
    isValid: boolean;
    passengerIndex: number;
    formValue: PassengersData;
    passengerTitle: 'Adult' | 'Children' | 'Infant';
  }>();

  passengerForm!: FormGroup;

  gender = Gender;

  today: Date = new Date();

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.passengerForm = this.formBuilder.group({
      firstName: [
        this.initialValues?.firstName || '',
        [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\s']+$/)]
      ],
      lastName: [
        this.initialValues?.lastName || '',
        [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\s']+$/)]
      ],
      gender: [this.initialValues?.gender || '', [Validators.required]],
      dateOfBirth: [
        this.initialValues?.dateOfBirth || '',
        [Validators.required, dateOfBirthValidator]
      ],
      specialAssistance: [this.initialValues?.specialAssistance || false, [Validators.required]],
      checkedInBaggage: [this.initialValues?.checkedInBaggage || false, [Validators.required]]
    });
    this.subscriptions.push(
      this.passengerForm.valueChanges.subscribe(() => {
        const { valid, value } = this.passengerForm;
        const eventValue = {
          isValid: valid,
          passengerIndex: this.passengerIndex,
          formValue: { ...value, id: this.initialValues?.id },
          passengerTitle: this.passengerTitle
        };

        this.passengerFormChanges.emit(eventValue);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  getErrorMessage(fieldName: string): string {
    const fieldControl = this.passengerForm?.get(fieldName);

    if (fieldControl?.hasError('required')) {
      return 'Enter data please';
    }
    if (fieldControl?.hasError('pattern')) {
      return 'Invalid character';
    }
    if (fieldControl?.hasError('minlength')) {
      return 'Must be at least 2 digits';
    }
    if (fieldControl?.hasError('dateOfBirthInvalid')) {
      return 'Date of birth cannot be later than today';
    }
    return '';
  }
}
