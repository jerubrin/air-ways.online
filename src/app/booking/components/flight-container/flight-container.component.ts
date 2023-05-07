import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-container',
  templateUrl: './flight-container.component.html',
  styleUrls: ['./flight-container.component.scss']
})
export class FlightContainerComponent implements OnInit {
  @Input() flight?: Flight;

  @Input() isForward?: boolean;

  date?: Date;

  selected = 0;

  ngOnInit(): void {
    if (this.flight?.takeoffDate) {
      this.date = new Date(this.flight?.takeoffDate);
    }
  }

  select(value: number) {
    this.selected = value;
  }

  get selectedFlight(): Flight | undefined {
    if (!this.flight?.otherFlights) {
      return undefined;
    }

    return this.selected === 0
      ? this.flight
      : this.flight.otherFlights[this.selected];
  }
}
