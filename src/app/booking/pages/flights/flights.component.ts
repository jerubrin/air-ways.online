import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StepperService } from 'src/app/core/services/stepper.service';

import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {
  nameForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private flightsService: FlightsService,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.nameForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  goBack(): void {
    this.router.navigate([RoutesPath.MainPage]);
  }

  onSubmit(): void {
    if (this.nameForm.invalid) {
      return;
    }

    this.stepperService.next();

    this.flightsService.updateFormState(this.nameForm);
  }
}
