import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlightSearchFormComponent } from './pages/components/flight-search-form/flight-search-form.component';

@NgModule({
  declarations: [MainPageComponent, FlightSearchFormComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule]
})
export class MainModule {}
