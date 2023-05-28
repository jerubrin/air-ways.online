import { Injectable } from '@angular/core';
import { Flight } from 'src/app/booking/models/flight.model';
import DateDiff from 'date-diff';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  private formValid = true;

  selectedFlights = new Array<Flight | undefined>(2);

  selected: boolean[] = [false, false];

  hasBackDate?: boolean;

  totalCountOfSeats?: number;

  constructor(public dialog: MatDialog) {}

  get isValid(): boolean {
    return !!(this.hasBackDate
      ? this.selectedFlights[0] && this.selectedFlights[1]
      : !!this.selectedFlights[0]);
  }

  private openMessageDialog(title: string, message: string) {
    this.dialog.open(MessageDialogComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { title, message }
    });
  }

  selectFlight(num: number, flight?: Flight) {
    if (this.hasBackDate && num === 0 && flight && this.selectedFlights[1]) {
      const date1 = new Date(this.selectedFlights[1].takeoffDate);
      const date2 = new Date(flight.landingDate);
      const diff = new DateDiff(date1, date2);
      if (diff.hours() < 3) {
        this.openMessageDialog('Error!', 'You cannot select a flight earlier than the return flight. And the time difference should be at least 3 hours.');
        return;
      }
    }
    if (this.hasBackDate && num === 1 && flight && this.selectedFlights[0]) {
      const date1 = new Date(flight.takeoffDate);
      const date2 = new Date(this.selectedFlights[0].landingDate);
      const diff = new DateDiff(date1, date2);
      if (diff.hours() < 3) {
        this.openMessageDialog('Error!', 'You cannot select a return flight earlier than the first flight. And the time difference should be at least 3 hours.');
        return;
      }
    }
    if (flight && this.totalCountOfSeats && flight.seats.avaible < this.totalCountOfSeats) {
      this.openMessageDialog('Error!', 'You cannot select this flight. Not enough available seats.');
      return;
    }
    this.selectedFlights[num] = flight;
    this.selected[num] = !!flight;
    this.updateFormState(this.isValid);
  }

  updateFormState(isValid: boolean): void {
    this.formValid = isValid;
  }

  isFormValid(): boolean {
    return this.formValid;
  }
}
