import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent {
  forwardDateMock = new Date('06-07-2023');

  backDateMock = new Date('08-17-2023');
}
