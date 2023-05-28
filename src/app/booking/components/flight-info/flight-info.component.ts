import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss']
})
export class FlightInfoComponent implements OnInit {
  @Input() flight?: Flight;

  @Input() isForward?: boolean;

  gmtDiffer = 0;

  ngOnInit(): void {
    const diff = +this.flight.to.gmt - +this.flight.form.gmt;
    this.gmtDiffer = Number.isNaN(diff) ? 0 : diff;
  }
}
