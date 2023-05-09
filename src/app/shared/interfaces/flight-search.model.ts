export interface FlightSearch {
  fromKey: string;
  toKey: string;
  forwardDate: string;
  backDate?: string;
  adults: number,
  children: number,
  infants: number
}
