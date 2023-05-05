import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required]
  });

  secondFormGroup = this.fb.group({
    secondCtrl: ''
  });

  isOptional = false;

  constructor(private fb: FormBuilder) {}
}
