import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class StepperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            this.updateStepFromRoute();
          });
        }
      })
    );
    setTimeout(() => {
      this.updateStepFromRoute();
    });
  }

  private updateStepFromRoute(): void {
    const { url } = this.router;

    if (url.includes('flight')) {
      this.goToFlightsStep();
    } else if (url.includes('passengers')) {
      this.goToPassengersStep();
    } else if (url.includes('review')) {
      this.goToReviewStep();
    }
  }

  private setStepCompletionStatus(index: number, isCompleted: boolean): void {
    sessionStorage.setItem(`step${index}CompletionStatus`, JSON.stringify(isCompleted));
  }

  private goToFlightsStep(): void {
    this.stepper.selectedIndex = 0;

    const step1Status = sessionStorage.getItem('step1CompletionStatus');
    const step2Status = sessionStorage.getItem('step2CompletionStatus');

    if (step1Status) {
      this.stepper.steps.toArray()[1].completed = JSON.parse(step1Status);
    }
    if (step2Status) {
      this.stepper.steps.toArray()[2].completed = JSON.parse(step2Status);
    }
  }

  private goToPassengersStep(): void {
    this.stepper.selectedIndex = 1;

    this.setStepCompletionStatus(1, true);

    const step2Status = sessionStorage.getItem('step2CompletionStatus');

    if (step2Status) {
      this.stepper.steps.toArray()[2].completed = JSON.parse(step2Status);
    }
  }

  private goToReviewStep(): void {
    this.stepper.selectedIndex = 2;

    this.setStepCompletionStatus(2, true);

    const step1Status = sessionStorage.getItem('step1CompletionStatus');

    if (step1Status) {
      this.stepper.steps.toArray()[1].completed = JSON.parse(step1Status);
    }
  }
}
