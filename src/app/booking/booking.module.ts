import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { BookingRoutingModule } from './booking-routing.module';
import { FlightsComponent } from './pages/flights/flights.component';
import { PassengersComponent } from './pages/passengers/passengers.component';
import { ReviewPaymentComponent } from './pages/review-payment/review-payment.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BookingPageComponent,
    FlightsComponent,
    PassengersComponent,
    ReviewPaymentComponent
  ],
  imports: [CommonModule, BookingRoutingModule, SharedModule]
})
export class BookingModule {}
