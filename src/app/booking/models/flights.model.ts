// eslint-disable-next-line import/no-cycle
import { Flight } from './flight.model';

export interface Flights {
  [key: string]: Flight | undefined;
}
