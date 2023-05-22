export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}
export interface PassengersResultData {
  adults: PassengersData[];
  children: PassengersData[];
  infants: PassengersData[];
  contactDetailsData: ContactDetailsData;
}

export interface PassengersData {
  firstName: string;
  lastName: string;
  // gender: string;
  // dateOfBirth: string;
}
export interface ContactDetailsData {
  firstName: string;
  lastName: string;
  // countryCode: string;
  // phone: string;
  // email: string;
}
