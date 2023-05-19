import { Price } from './price.model';

export interface PriceList {
  '-2'?: Price | null;
  '-1'?: Price | null;
  '0': Price;
  '1'?: Price | null;
  '2'?: Price | null;
}
