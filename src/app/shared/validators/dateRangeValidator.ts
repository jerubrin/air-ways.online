/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function dateRangeValidator(departureDateValue: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const returnDate = moment(control.value);
    const departureDate = moment(departureDateValue);

    if (returnDate.isValid() && departureDate.isValid() && returnDate.isBefore(departureDate)) {
      return { dateRange: true };
    }
    return null;
  };
}
