import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FlightSearchFormComponent } from './components/flight-search-form/flight-search-form.component';

@NgModule({
  declarations: [FlightSearchFormComponent, OrderByPipe],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    FlightSearchFormComponent,
    OrderByPipe,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
