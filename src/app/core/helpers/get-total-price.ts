import { Flight } from 'src/app/booking/models/flight.model';
import { Price } from 'src/app/booking/models/price.model';
import { LongPrice } from 'src/app/shared/interfaces/long-price';
import { TotalPrices } from 'src/app/shared/interfaces/total-prices';
import { CartPriceData } from '../interfaces/cart-price-data';

function getPricesSum(priceOne?: Price, priceTwo?: Price, factor = 0): Price {
  return {
    eur: ((priceOne?.eur ?? 0) + (priceTwo?.eur ?? 0)) * factor,
    usd: ((priceOne?.eur ?? 0) + (priceTwo?.usd ?? 0)) * factor,
    pln: ((priceOne?.eur ?? 0) + (priceTwo?.pln ?? 0)) * factor,
    rub: ((priceOne?.eur ?? 0) + (priceTwo?.rub ?? 0)) * factor
  };
}

function getPrice(price: Price, percentIndex?: number): LongPrice {
  const fullPrice = {
    eur: price.eur * (percentIndex ?? 1),
    pln: price.pln * (percentIndex ?? 1),
    usd: price.usd * (percentIndex ?? 1),
    rub: price.rub * (percentIndex ?? 1)
  };
  const tax: Price = {
    eur: fullPrice.eur * 0.11,
    pln: fullPrice.pln * 0.11,
    usd: fullPrice.usd * 0.11,
    rub: fullPrice.rub * 0.11
  };
  const fare: Price = {
    eur: fullPrice.eur - tax.eur,
    pln: fullPrice.pln - tax.pln,
    usd: fullPrice.usd - tax.usd,
    rub: fullPrice.rub - tax.rub
  };
  return { fullPrice, fare, tax };
}

function getPrices(cartPriceData: CartPriceData, flights: Flight[]): TotalPrices {
  return {
    adults: getPrice(
      getPricesSum(
        flights[0]?.price,
        flights[1]?.price,
        cartPriceData?.adults
      )
    ),
    adultsCount: cartPriceData.adults ?? 0,
    children: getPrice(
      getPricesSum(
        flights[0]?.price,
        flights[1]?.price,
        cartPriceData?.children
      ),
      0.6
    ),
    childrenCount: cartPriceData.children ?? 0,
    infants: getPrice(
      getPricesSum(
        flights[0]?.price,
        flights[1]?.price,
        cartPriceData.infants
      ),
      0.3
    ),
    infantsCount: cartPriceData.infants ?? 0
  };
}

export function getTotalPrice(cartPriceData: CartPriceData, flights: Flight[]): Price {
  const { adults, children, infants } = getPrices(cartPriceData, flights);
  return {
    eur: ((adults?.fullPrice.eur ?? 0)
      + (children?.fullPrice.eur ?? 0)
      + (infants?.fullPrice.eur ?? 0)),
    usd: ((adults?.fullPrice.usd ?? 0)
      + (children?.fullPrice.usd ?? 0)
      + (infants?.fullPrice.usd ?? 0)),
    pln: ((adults?.fullPrice.pln ?? 0)
      + (children?.fullPrice.pln ?? 0)
      + (infants?.fullPrice.pln ?? 0)),
    rub: ((adults?.fullPrice.rub ?? 0)
      + (children?.fullPrice.rub ?? 0)
      + (infants?.fullPrice.rub ?? 0))
  };
}
