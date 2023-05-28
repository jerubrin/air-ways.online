import { Flight } from 'src/app/booking/models/flight.model';
import { QueryParams } from 'src/app/shared/interfaces/query-params.model';
import { CartPriceData } from './cart-price-data';
import { PassengersResultData } from './passengers-result-data';
import { RandomData } from './random-data';

export interface Cart {
  id: string,
  isChecked?: boolean,
  cartPriceData: CartPriceData,
  passengersResult: PassengersResultData,
  flights: Flight[],
  queryParams: Partial<QueryParams>,
  randomData: RandomData
}
