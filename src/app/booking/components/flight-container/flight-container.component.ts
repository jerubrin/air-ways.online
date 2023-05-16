import { Component, Input } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-container',
  templateUrl: './flight-container.component.html',
  styleUrls: ['./flight-container.component.scss']
})
export class FlightContainerComponent {
  @Input() flight?: Flight;

  @Input() isForward?: boolean;

  selected = 0;

  isSelected = false;

  setSelection = (value: boolean) => this.isSelected = value;

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
