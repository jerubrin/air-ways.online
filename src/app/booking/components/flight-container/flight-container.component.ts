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

  ngOnInit(): void {
    if (this.flight?.takeoffDate) {
      this.date = new Date(this.flight?.takeoffDate);
    }
  }
}
