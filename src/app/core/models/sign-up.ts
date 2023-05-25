import { CountryCode } from 'src/app/shared/interfaces/country-code';
import { Gender } from '../interfaces/passengers-data';

export interface SignUp {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  gender: Gender,
  countryCode: CountryCode,
  phone: string,
  citizenship: CountryCode
}
