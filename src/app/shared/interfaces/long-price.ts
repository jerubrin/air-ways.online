import { Price } from 'src/app/booking/models/price.model';

export interface LongPrice {
  fullPrice: Price,
  fare: Price,
  tax: Price,
}
