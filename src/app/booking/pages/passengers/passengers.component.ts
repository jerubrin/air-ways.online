import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

import { PassengersService } from '../../services/passengers.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent {
  constructor(
    private passengersService: PassengersService,
    private queryParamsService: QueryParamsService,
    private stepperService: StepperService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
