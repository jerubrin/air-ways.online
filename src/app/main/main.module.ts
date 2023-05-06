import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainRoutingModule } from './main-routing.module';
import { FlightSearchFormComponent } from './pages/components/flight-search-form/flight-search-form.component';
import { MaterialModule } from '../core/modules/material.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [MainPageComponent, FlightSearchFormComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule
  ]
})
export class MainModule {}
