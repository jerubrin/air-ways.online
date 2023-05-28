import { Component, Input } from '@angular/core';
import { Flight } from 'src/app/booking/models/flight.model';

@Component({
  selector: 'app-review-flight-header',
  templateUrl: './review-flight-header.component.html',
  styleUrls: ['./review-flight-header.component.scss']
})
export class ReviewFlightHeaderComponent {
  @Input() flight?: Flight;
}
