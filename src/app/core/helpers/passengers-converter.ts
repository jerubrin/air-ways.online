/* eslint-disable no-plusplus */
import { PassengerReview } from 'src/app/shared/interfaces/passenger-review';
import { PassengersResultData } from '../interfaces/passengers-result-data';
import { RandomData } from '../interfaces/random-data';

function getSeats(length: number, randomData: RandomData,) {
  const seats: string[] = [];
  let { seatNum } = randomData;
  let index = -1;
  for (let i = 0; i < length; i += 1) {
    index = index >= randomData.symbols.length - 1 ? 0 : index + 1;
    seats.push(seatNum + randomData.symbols[index]);
    if (index >= randomData.symbols.length - 1) {
      seatNum += 1;
    }
  }
  return seats;
}

export function getPassengers(
  passengersResult?: PassengersResultData,
  randomData?: RandomData,
) {
  if (!passengersResult || !randomData) {
    return [];
  }
  const { hasBaggage, hasCabinBag } = randomData;
  let index = 0;
  const seats = getSeats(
    passengersResult.adults.length + passengersResult.children.length,
    randomData,
  );
  const passengers: PassengerReview[] = [
    ...passengersResult.adults.map((passenger) => ({
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      hasBaggage: hasBaggage && hasCabinBag,
      hasCabinBag,
      seat: seats[index++],
    } as PassengerReview)),
    ...passengersResult.children.map((passenger) => ({
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      hasBaggage: hasBaggage && hasCabinBag,
      hasCabinBag,
      seat: seats[index++],
    } as PassengerReview)),
    ...passengersResult.infants.map((passenger) => ({
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      hasBaggage: hasBaggage && hasCabinBag,
      hasCabinBag,
    } as PassengerReview)),
  ];
  return passengers;
}
