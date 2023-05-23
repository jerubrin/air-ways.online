import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MainStoreService } from 'src/app/core/services/main-store.service';
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

  @Input() selected = 0;

  constructor(
    private store: MainStoreService,
  ) {}

  setSelection = (value: boolean) => {
    this.selectEmitter.emit(value ? this.selectedFlight : undefined);
  };

  select(value: number) {
    this.store.selectedFlights = [
      this.isForward ? value : this.store.selectedFlights[0],
      !this.isForward ? value : this.store.selectedFlights[1]
    ];
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
