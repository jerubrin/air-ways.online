import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-block',
  templateUrl: './flight-block.component.html',
  styleUrls: ['./flight-block.component.scss']
})
export class FlightBlockComponent {
  @Input() flight?: Flight;

  @Input() isSelected?: boolean;

  @Input() isForward?: boolean;

  @Output() setSelection = new EventEmitter<boolean>();

  setSelectionFn = (value: boolean) => this.setSelection.emit(value);
}
