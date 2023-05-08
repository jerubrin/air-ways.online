import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  private formValid = true;
  // private formValid = false;

  updateFormState(form: FormGroup): void {
    this.formValid = form.valid;
  }

  isFormValid(): boolean {
    return this.formValid;
  }
}
