import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { StepperService } from 'src/app/core/services/stepper.service';

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
export class StepperComponent implements AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private stepperService: StepperService) {}

  ngAfterViewInit() {
    this.stepperService.setStepper(this.stepper);
  }
}
