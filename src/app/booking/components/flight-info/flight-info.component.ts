import { Component, Input } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss']
})
export class FlightInfoComponent {
  @Input() flight?: Flight;

  @Input() isForward?: boolean;
}
