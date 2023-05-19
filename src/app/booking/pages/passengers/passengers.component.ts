import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

import { PassengersService } from '../../services/passengers.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit, OnDestroy {
  adultsCounts!: number;

  childrenCounts!: number;

  infantsCounts!: number;

  passengers: { title: 'Adult' | 'Children' | 'Infant' }[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private passengersService: PassengersService,
    private queryParamsService: QueryParamsService,
    private stepperService: StepperService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((currentParams) => {
        this.setInitialValuesFromQueryParams(currentParams);
        this.updatePassengers();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private setInitialValuesFromQueryParams(params: any): void {
    this.adultsCounts = params.adults ? Number(params.adults) : 1;
    this.childrenCounts = params.children ? Number(params.children) : 0;
    this.infantsCounts = params.infants ? Number(params.infants) : 0;
  }

  private updatePassengers(): void {
    this.passengers = [];
    for (let i = 0; i < this.adultsCounts; i += 1) {
      this.passengers.push({ title: 'Adult' });
    }
    for (let i = 0; i < this.childrenCounts; i += 1) {
      this.passengers.push({ title: 'Children' });
    }
    for (let i = 0; i < this.infantsCounts; i += 1) {
      this.passengers.push({ title: 'Infant' });
    }
  }

  hasPassengers(): boolean {
    return this.passengers.length > 0;
  }

  goBack() {
    const queryParams = this.queryParamsService.getQueryParams();

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageFlights}`], {
      queryParams
    });

    this.stepperService.previous();
  }

  goNext() {
    this.stepperService.next();
    // this.passengersService.updateFormState(this.form);
  }
}
