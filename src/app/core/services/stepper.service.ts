import { Injectable } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private stepper!: MatStepper;

  setStepper(stepper: MatStepper) {
    this.stepper = stepper;
  }

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }
}
