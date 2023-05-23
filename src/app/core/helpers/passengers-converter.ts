/* eslint-disable no-plusplus */
import { PassengerReview } from 'src/app/shared/interfaces/passenger-review';
import { PassengersResultData } from '../interfaces/passengers-result-data';

function getSeats(length: number) {
  const symbols = Math.random() > 0.5
    ? ['A', 'B', 'C', 'D', 'E', 'F']
    : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seats: string[] = [];
  let seatNum = Math.trunc(Math.random() * 60) + 1;
  let index = -1;
  for (let i = 0; i < length; i += 1) {
    index = index >= symbols.length - 1 ? 0 : index + 1;
    seats.push(seatNum + symbols[index]);
    if (index >= symbols.length - 1) {
      seatNum += 1;
    }
  }
  return seats;
}

export function getPassengers(passengersResult?: PassengersResultData) {
  if (!passengersResult) {
    return [];
  }
  const hasBaggage = Math.random() > 0.5;
  const hasCabinBag = Math.random() > 0.5;
  let index = 0;
  const seats = getSeats(
    passengersResult.adults.length + passengersResult.children.length
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
