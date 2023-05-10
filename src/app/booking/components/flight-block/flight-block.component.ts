import { Component, Input } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-block',
  templateUrl: './flight-block.component.html',
  styleUrls: ['./flight-block.component.scss']
})
export class FlightBlockComponent {
  @Input() flight?: Flight;
}
