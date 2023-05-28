import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import RoutesPath from '../shared/data/enams/RoutesPath';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { PassengersComponent } from './pages/passengers/passengers.component';
import { ReviewPaymentComponent } from './pages/review-payment/review-payment.component';

const routes: Routes = [
  {
    path: '',
    component: BookingPageComponent,
    children: [
      { path: RoutesPath.BookingPageFlights, component: FlightsComponent },
      {
        path: RoutesPath.BookingPagePassengers,
        component: PassengersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: RoutesPath.BookingPageReviewPayment,
        component: ReviewPaymentComponent,
        canActivate: [AuthGuard]
      },
      { path: '', redirectTo: RoutesPath.BookingPageFlights, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {}
