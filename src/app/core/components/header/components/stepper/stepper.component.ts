import { Component, EventEmitter, Output } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class StepperComponent {
  @Output() activeStep = new EventEmitter<string>();

  isPassengersStepAvailable = false;

  isReviewStepAvailable = false;

  stepChanged(event: any) {
    switch (event.selectedIndex) {
      case 0:
        this.activeStep.emit('flights');
        break;
      case 1:
        this.activeStep.emit('passengers');
        break;
      case 2:
        this.activeStep.emit('review');
        break;
      default:
        break;
    }
  }
}
