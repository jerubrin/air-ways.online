import { Cart } from 'src/app/core/interfaces/cart';

export const sortByNumber = (a: Cart, b: Cart) => {
  const noA = a.flights[0].flightNumber.toLowerCase();
  const noB = b.flights[0].flightNumber.toLowerCase();

  return noA < noB ? -1 : 1;
};

export const sortByFlight = (a: Cart, b: Cart) => {
  const flightA = a.flights[0].form.city.toLowerCase();
  const flightB = b.flights[0].form.city.toLowerCase();

  return flightA < flightB ? -1 : 1;
};

export const sortByType = (a: Cart, b: Cart) => {
  const flightA = a.flights[1] ? 1 : -1;
  const flightB = b.flights[1] ? 1 : -1;

  return flightA < flightB ? -1 : 1;
};

export const sortByDate = (a: Cart, b: Cart) => {
  const flightA = new Date(a.flights[0].takeoffDate).getTime();
  const flightB = new Date(b.flights[0].takeoffDate).getTime();

  return flightA < flightB ? -1 : 1;
};

export const sortByPrice = (a: Cart, b: Cart) => {
  const flightA = a.cartPriceData.totalPrice.eur;
  const flightB = b.cartPriceData.totalPrice.eur;

  return flightA < flightB ? -1 : 1;
};
