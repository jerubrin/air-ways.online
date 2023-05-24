import { Price } from 'src/app/booking/models/price.model';

export interface CartPriceData {
  totalPrice: Price,
  adults: number,
  children: number,
  infants: number,
}
