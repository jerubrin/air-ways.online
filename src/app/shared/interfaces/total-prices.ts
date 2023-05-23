import { LongPrice } from './long-price';

export interface TotalPrices {
  adults: LongPrice,
  adultsCount: number,
  children: LongPrice,
  childrenCount: number,
  infants: LongPrice,
  infantsCount: number,
}
