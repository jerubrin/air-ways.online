import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function autocompleteObjectValidator(options: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (typeof control.value === 'string') {
      const selectedOption = options.find(
        (option) => `${option.city} (${option.key})` === control.value
      );
      return selectedOption ? null : { matchOption: true };
    }
    return null;
  };
}
