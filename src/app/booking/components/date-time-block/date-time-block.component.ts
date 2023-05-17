import { Component, Input } from '@angular/core';

import { Airport } from '../../../shared/interfaces/airport.model';

@Component({
  selector: 'app-date-time-block',
  templateUrl: './date-time-block.component.html',
  styleUrls: ['./date-time-block.component.scss']
})
export class DateTimeBlockComponent {
  @Input() date?: string;

  @Input() airport?: Airport;

  @Input() turnRight?: boolean;
}
