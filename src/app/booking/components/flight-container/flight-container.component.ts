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
}
