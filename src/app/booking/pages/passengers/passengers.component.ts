import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StepperService } from 'src/app/core/services/stepper.service';
import RoutesPath from 'src/app/shared/data/enams/RoutesPath';

import { PassengersService } from '../../services/passengers.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent {
  form!: FormGroup;

  flights: any;

  constructor(
    private fb: FormBuilder,
    private passengersService: PassengersService,
    private stepperService: StepperService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();

    this.flights = this.route.snapshot.queryParams['flights'];
  }

  createForm() {
    this.form = this.fb.group({
      passengers: ['', Validators.required]
    });
  }

  goBack() {
    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageFlights}`]);

    this.stepperService.previous();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const queryParams: Params = { flights: this.flights, passengers: this.form.value.passengers };

    this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPageReviewPayment}`], {
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.stepperService.next();

    this.passengersService.updateFormState(this.form);
  }
}
