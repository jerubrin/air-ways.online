import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainRoutingModule } from './main-routing.module';
import { FlightSearchFormComponent } from './pages/components/flight-search-form/flight-search-form.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [MainPageComponent, FlightSearchFormComponent],
  imports: [CommonModule, MainRoutingModule, CoreModule]
})
export class MainModule {}
