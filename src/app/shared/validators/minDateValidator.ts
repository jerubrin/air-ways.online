import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

export function minDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = moment(control.value);
    const today = moment().startOf('day');
    if (selectedDate.isBefore(today)) {
      return { minDate: true };
    }
    return null;
  };
}
