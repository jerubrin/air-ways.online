import { Airport } from './airport.model';
import { Price } from './price.model';
import { PriceList } from './prices.model';

export interface Flight {
  form: Airport;
  to: Airport;
  takeoffDate: string;
  landingDate: string;
  timeMins: number;
  avaible: number;
  price: Price;
  prices: PriceList;
  flightNumber: string;
}
