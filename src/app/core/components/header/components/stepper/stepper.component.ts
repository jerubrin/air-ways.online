import { Component, ViewChild } from '@angular/core';
import { StepperSelectionEvent, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { MatStepper } from '@angular/material/stepper';
import { StepperService } from 'src/app/core/services/stepper.service';
import { Router } from '@angular/router';

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
  @ViewChild('stepper') stepper!: MatStepper;

  routesPath = RoutesPath;

  constructor(private router: Router, private stepperService: StepperService) {}

  ngAfterViewInit() {
    this.stepperService.setStepper(this.stepper);
  }

  onStepSelected(event: StepperSelectionEvent): void {
    const selectedStepIndex = event.selectedIndex;

    switch (selectedStepIndex) {
      case 0:
        this.router.navigate([
          `/${this.routesPath.BookingPage}/${this.routesPath.BookingPageFlights}`
        ]);
        break;
      case 1:
        this.router.navigate([
          `/${this.routesPath.BookingPage}/${this.routesPath.BookingPagePassengers}`
        ]);
        break;
      case 2:
        this.router.navigate([
          `/${this.routesPath.BookingPage}/${this.routesPath.BookingPageReviewPayment}`
        ]);
        break;
      default:
        break;
    }
  }
}
