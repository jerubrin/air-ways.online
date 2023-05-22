import { Component, Input } from '@angular/core';
import { Flight } from 'src/app/booking/models/flight.model';

@Component({
  selector: 'app-review-flight-container',
  templateUrl: './review-flight-container.component.html',
  styleUrls: ['./review-flight-container.component.scss']
})
export class ReviewFlightContainerComponent {
  @Input() flight?: Flight;
}
