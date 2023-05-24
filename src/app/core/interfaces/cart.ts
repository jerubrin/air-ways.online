import { Flight } from 'src/app/booking/models/flight.model';
import { QueryParams } from 'src/app/shared/interfaces/query-params.model';
import { CartPriceData } from './cart-price-data';
import { PassengersResultData } from './passengers-result-data';

export interface Cart {
  id: string,
  cartPriceData: CartPriceData,
  passengersResult: PassengersResultData,
  flights: Flight[],
  queryParams: Partial<QueryParams>,
}
