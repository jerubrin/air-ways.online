import { Airport } from './airport.model';
// eslint-disable-next-line import/no-cycle
import { Flights } from './flights.model';
import { Price } from './price.model';
import { Seats } from './seats.model';

export interface Flight {
  form: Airport;
  to: Airport;
  takeoffDate: string;
  landingDate: string;
  timeMins: number;
  seats: Seats;
  price: Price;
  otherFlights?: Flights;
  flightNumber: string;
}
