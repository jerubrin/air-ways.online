import { Component, Input } from '@angular/core';
import { PassengerReview } from 'src/app/shared/interfaces/passenger-review';

@Component({
  selector: 'app-review-flight-passenger',
  templateUrl: './review-flight-passenger.component.html',
  styleUrls: ['./review-flight-passenger.component.scss']
})
export class ReviewFlightPassengerComponent {
  @Input() passenger?: PassengerReview;
}
