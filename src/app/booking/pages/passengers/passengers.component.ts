import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperService } from 'src/app/core/services/stepper.service';

import { PassengersService } from '../../services/passengers.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent {
  nameForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private passengersService: PassengersService,
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

  goBack() {
    this.stepperService.back();
  }

  onSubmit() {
    if (this.nameForm.invalid) {
      return;
    }

    this.stepperService.next();

    this.passengersService.updateFormState(this.nameForm);
  }
}
