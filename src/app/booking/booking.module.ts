import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { BookingRoutingModule } from './booking-routing.module';

@NgModule({
  declarations: [BookingPageComponent],
  imports: [CommonModule, BookingRoutingModule],
})
export class BookingModule {}
