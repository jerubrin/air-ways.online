import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PassengersFormFieldComponent } from './components/passengers-form-field/passengers-form-field.component';

import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DatepickerRangeComponent } from './components/datepicker-range/datepicker-range.component';
import { DestinationFormFieldComponent } from './components/destination-form-field/destination-form-field.component';

@NgModule({
  declarations: [
    OrderByPipe,
    PassengersFormFieldComponent,
    DatepickerComponent,
    DatepickerRangeComponent,
    DestinationFormFieldComponent
  ],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    DatepickerComponent,
    DatepickerRangeComponent,
    DestinationFormFieldComponent,
    PassengersFormFieldComponent,
    OrderByPipe,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
