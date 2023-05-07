import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  // private formValid = false;
  private formValid = true;

  updateFormState(form: FormGroup): void {
    this.formValid = form.valid;
  }

  isFormValid(): boolean {
    return this.formValid;
  }
}
