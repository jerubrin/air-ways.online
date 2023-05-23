import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { BookingRoutingModule } from './booking-routing.module';
import { DirectionTitleComponent } from './components/direction-title/direction-title.component';
import { TopDateCardsComponent } from './components/top-date-cards/top-date-cards.component';
import { DateCardComponent } from './components/date-card/date-card.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { FlightPriceAndSeatsComponent } from './components/flight-price-and-seats/flight-price-and-seats.component';
import { FlightContainerComponent } from './components/flight-container/flight-container.component';
import { FlightBlockComponent } from './components/flight-block/flight-block.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { PassengersComponent } from './pages/passengers/passengers.component';
import { ReviewPaymentComponent } from './pages/review-payment/review-payment.component';
import { SharedModule } from '../shared/shared.module';
import { SecondMenuComponent } from '../core/components/second-menu/second-menu.component';
import { DateTimeBlockComponent } from './components/date-time-block/date-time-block.component';
import { GmtPipe } from './pipes/gmt.pipe';
import { FlightTimePipe } from './pipes/flight-time.pipe';
import { PricePipe } from './pipes/price.pipe';
import { EditFlightSearchFormComponent } from './components/edit-flight-search-form/edit-flight-search-form.component';
import { PassengerFormComponent } from './pages/passengers/components/passenger-form/passenger-form.component';
import { ContactDetailsFormComponent } from './pages/passengers/components/contact-details-form/contact-details-form.component';
import { ReviewFlightHeaderComponent } from './components/review-payment/review-flight-header/review-flight-header.component';
import { ReviewFlightContainerComponent } from './components/review-payment/review-flight-container/review-flight-container.component';
import { ReviewFlightPassengerComponent } from './components/review-payment/review-flight-passenger/review-flight-passenger.component';
import { ReviewPriceContainerComponent } from './components/review-payment/review-price-container/review-price-container.component';
import { ReviewPriceItemComponent } from './components/review-payment/review-price-item/review-price-item.component';
import { BgSeatsDirective } from './directives/bg-seats.directive';

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
    PricePipe,
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
  imports: [CommonModule, SharedModule, BookingRoutingModule]
})
export class BookingModule {}
