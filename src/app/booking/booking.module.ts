import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingPagePassangersComponent } from './pages/booking-page-passangers/booking-page-passangers.component';
import { DirectionTitleComponent } from './components/direction-title/direction-title.component';
import { TopDateCardsComponent } from './components/top-date-cards/top-date-cards.component';
import { DateCardComponent } from './components/date-card/date-card.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { FlightPriceAndSeatsComponent } from './components/flight-price-and-seats/flight-price-and-seats.component';
import { FlightContainerComponent } from './components/flight-container/flight-container.component';

@NgModule({
  declarations: [
    BookingPageComponent,
    BookingPagePassangersComponent,
    DirectionTitleComponent,
    TopDateCardsComponent,
    DateCardComponent,
    FlightInfoComponent,
    FlightPriceAndSeatsComponent,
    FlightContainerComponent,
  ],
  imports: [CommonModule, BookingRoutingModule],
})
export class BookingModule {}
