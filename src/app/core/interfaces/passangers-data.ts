export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface PassengersData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  specialAssistance?: boolean;
}
