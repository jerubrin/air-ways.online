import { Flight } from 'src/app/booking/models/flight.model';
import { Passenger } from './pasanger';
import { Contacts } from './contacts';

export interface Cart {
  passengers: Passenger[],
  contacts: Contacts,
  flights: Flight[],
}
