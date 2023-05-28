import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecondMenuComponent } from '../core/components/second-menu/second-menu.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { BookingRoutingModule } from './booking-routing.module';
import { DateCardComponent } from './components/date-card/date-card.component';
import { DateTimeBlockComponent } from './components/date-time-block/date-time-block.component';
import { DirectionTitleComponent } from './components/direction-title/direction-title.component';
import { EditFlightSearchFormComponent } from './components/edit-flight-search-form/edit-flight-search-form.component';
import { FlightBlockComponent } from './components/flight-block/flight-block.component';
import { FlightContainerComponent } from './components/flight-container/flight-container.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { FlightPriceAndSeatsComponent } from './components/flight-price-and-seats/flight-price-and-seats.component';
import { ReviewFlightContainerComponent } from './components/review-payment/review-flight-container/review-flight-container.component';
import { ReviewFlightHeaderComponent } from './components/review-payment/review-flight-header/review-flight-header.component';
import { ReviewFlightPassengerComponent } from './components/review-payment/review-flight-passenger/review-flight-passenger.component';
import { ReviewPriceContainerComponent } from './components/review-payment/review-price-container/review-price-container.component';
import { ReviewPriceItemComponent } from './components/review-payment/review-price-item/review-price-item.component';
import { TopDateCardsComponent } from './components/top-date-cards/top-date-cards.component';
import { BgSeatsDirective } from './directives/bg-seats.directive';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { ContactDetailsFormComponent } from './pages/passengers/components/contact-details-form/contact-details-form.component';
import { PassengerFormComponent } from './pages/passengers/components/passenger-form/passenger-form.component';
import { PassengersComponent } from './pages/passengers/passengers.component';
import { ReviewPaymentComponent } from './pages/review-payment/review-payment.component';
import { FlightTimePipe } from './pipes/flight-time.pipe';
import { GmtPipe } from './pipes/gmt.pipe';

@NgModule({
  declarations: [
    BookingPageComponent,
    DirectionTitleComponent,
    TopDateCardsComponent,
    DateCardComponent,
    FlightInfoComponent,
    FlightPriceAndSeatsComponent,
    FlightContainerComponent,
    FlightBlockComponent,
    FlightsComponent,
    PassengersComponent,
    ReviewPaymentComponent,
    SecondMenuComponent,
    DateTimeBlockComponent,
    GmtPipe,
    FlightTimePipe,
    EditFlightSearchFormComponent,
    PassengerFormComponent,
    ContactDetailsFormComponent,
    ReviewFlightHeaderComponent,
    ReviewFlightContainerComponent,
    ReviewFlightPassengerComponent,
    ReviewPriceContainerComponent,
    ReviewPriceItemComponent,
    BgSeatsDirective
  ],
  imports: [CommonModule, SharedModule, CoreModule, BookingRoutingModule]
})
export class BookingModule {}
