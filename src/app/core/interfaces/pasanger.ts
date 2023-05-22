export enum PassengerType {
  Adult = 'Adult',
  Child = 'Child',
  Infant = 'Infant'
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface Passenger {
  type: PassengerType,
  firstName: string,
  lastName: string,
  gender: Gender,
  dateOfBirth: Date,
  specialAssistance?: boolean;
}
