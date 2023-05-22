import { Flight } from 'src/app/booking/models/flight.model';
import { QueryParams } from 'src/app/shared/interfaces/query-params.model';
import { PassengersResultData } from './passengers-result-data';

export interface Cart {
  passengersResult: PassengersResultData,
  flights: Flight[],
  queryParams: Partial<QueryParams>,
}
