export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export interface PassengersData {
  id: number;
  firstName: string;
  lastName: string;
  gender?: Gender;
  dateOfBirth: string;
  specialAssistance?: boolean;
  checkedInBaggage?: boolean;
}
