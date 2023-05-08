import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { StepperService } from 'src/app/core/services/stepper.service';

import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {
  form!: FormGroup;

  currentParams: any;

  fromWhere!: string;

  to!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private flightsService: FlightsService,
    private stepperService: StepperService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();

    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentParams = params;
      this.fromWhere = params['fromKey'];
      this.to = params['toKey'];

      console.log(this.currentParams);
    });
  }

  createForm() {
    this.form = this.fb.group({
      flights: ['', Validators.required]
    });
  }

  goBack(): void {
    this.router.navigate([RoutesPath.MainPage]);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const queryParams: Params = { flights: this.form.value.flights };

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPagePassengers}`], {
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.stepperService.next();

    this.flightsService.updateFormState(this.form);
  }
}
