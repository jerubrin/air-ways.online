import { Component } from '@angular/core';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent {
  forwardDateMock = new Date('06-07-2023');

  backDateMock = new Date('08-17-2023');

  mockFlights: Flight[] = [
    {
      form: {
        key: 'DUB',
        country: 'Ireland',
        city: 'Dublin',
        name: 'Dublin Airport'
      },
      to: {
        key: 'AMS',
        country: 'Netherlands',
        city: 'Amsterdam',
        name: 'Amsterdam Airport Schiphol'
      },
      takeoffDate: '2024-02-20T16:30:00.000Z',
      landingDate: '2024-02-20T20:15:00.000Z',
      timeMins: 225,
      avaible: 25,
      price: {
        eur: 250,
        usd: 275.79,
        rub: 22118.03,
        pln: 1147.52
      },
      prices: {
        0: {
          eur: 250,
          usd: 275.79,
          rub: 22118.03,
          pln: 1147.52
        },
        1: {
          eur: 250,
          usd: 275.79,
          rub: 22118.03,
          pln: 1147.52
        },
        2: {
          eur: 250,
          usd: 275.79,
          rub: 22118.03,
          pln: 1147.52
        },
        '-2': {
          eur: 250,
          usd: 275.79,
          rub: 22118.03,
          pln: 1147.52
        },
        '-1': {
          eur: 250,
          usd: 275.79,
          rub: 22118.03,
          pln: 1147.52
        }
      },
      flightNumber: 'FP-472'
    },
    {
      form: {
        key: 'AMS',
        country: 'Netherlands',
        city: 'Amsterdam',
        name: 'Amsterdam Airport Schiphol'
      },
      to: {
        key: 'AMS',
        country: 'Netherlands',
        city: 'Amsterdam',
        name: 'Amsterdam Airport Schiphol'
      },
      takeoffDate: '2024-02-25T11:15:00.000Z',
      landingDate: '2024-02-25T15:00:00.000Z',
      timeMins: 225,
      avaible: 8,
      price: {
        eur: 250,
        usd: 275.79,
        rub: 22118.03,
        pln: 1147.52
      },
      prices: {
        0: {
          eur: 250,
          usd: 275.79,
          rub: 22118.03,
          pln: 1147.52
        },
        1: {
          eur: 250,
          usd: 275.79,
          rub: 22118.03,
          pln: 1147.52
        },
        2: {
          eur: 250,
          usd: 275.79,
          rub: 22118.03,
          pln: 1147.52
        },
        '-2': {
          eur: 250,
          usd: 275.79,
          rub: 22118.03,
          pln: 1147.52
        },
        '-1': {
          eur: 250,
          usd: 275.79,
          rub: 22118.03,
          pln: 1147.52
        }
      },
      flightNumber: 'FP-472'
    }
  ];
}
