import { ContactDetails } from './contact-details';
import { PassengersData } from './passangers-data';

export interface PassengersResultData {
  adults: PassengersData[];
  children: PassengersData[];
  infants: PassengersData[];
  contactDetailsData: ContactDetails;
}
