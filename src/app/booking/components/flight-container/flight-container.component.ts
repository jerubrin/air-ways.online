import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-container',
  templateUrl: './flight-container.component.html',
  styleUrls: ['./flight-container.component.scss']
})
export class FlightContainerComponent {
  @Input() flight?: Flight;

  @Input() isForward?: boolean;

  @Output() selectEmitter = new EventEmitter<Flight | undefined>();

  @Input() isSelected?: boolean;

  selected = 0;

  setSelection = (value: boolean) => {
    this.selectEmitter.emit(value ? this.selectedFlight : undefined);
  };

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
