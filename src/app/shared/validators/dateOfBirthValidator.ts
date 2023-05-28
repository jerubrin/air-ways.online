import { AbstractControl, ValidationErrors } from '@angular/forms';

export default function dateOfBirthValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate: Date = control.value;
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate > today) {
    return { dateOfBirthInvalid: true };
  }

  return null;
}
