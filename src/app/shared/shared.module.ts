import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FlightSearchFormComponent } from './components/flight-search-form/flight-search-form.component';
import { PassengersFormFieldComponent } from './components/passengers-form-field/passengers-form-field.component';
import { EditFlightSearchFormComponent } from './components/edit-flight-search-form/edit-flight-search-form.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DatepickerRangeComponent } from './components/datepicker-range/datepicker-range.component';
import { DestinationFormFieldComponent } from './components/destination-form-field/destination-form-field.component';

@NgModule({
  declarations: [
    FlightSearchFormComponent,
    OrderByPipe,
    PassengersFormFieldComponent,
    EditFlightSearchFormComponent,
    DatepickerComponent,
    DatepickerRangeComponent,
    DestinationFormFieldComponent
  ],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    FlightSearchFormComponent,
    EditFlightSearchFormComponent,
    OrderByPipe,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
