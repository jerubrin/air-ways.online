import { Flight } from 'src/app/booking/models/flight.model';
import { CartPriceData } from './cart-price-data';
import { PassengersResultData } from './passengers-result-data';

export interface Payment {
  id: string,
  email?: string,
  cartPriceData: CartPriceData,
  passengersResult: PassengersResultData,
  flights: Flight[],
}
