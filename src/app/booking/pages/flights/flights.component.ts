import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ActivatedRoute, Params, Router } from '@angular/router';

// import { StepperService } from 'src/app/core/services/stepper.service';

// import RoutesPath from 'src/app/shared/data/enams/RoutesPath';
// import { FlightsService } from '../../services/flights.service';

import { FlightSearchService } from 'src/app/core/services/flight-search.service';
import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, OnDestroy {
  constructor(
    private flightSearchService: FlightSearchService,
  ) {}

  ngOnInit(): void {
    this.flightSearchService.getFlightSearchParams();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  mockFlights: Flight[] = [
    {
      seats: {
        total: 125,
        avaible: 109
      },
      flightNumber: 'AY-692',
      timeMins: 168,
      form: {
        key: 'AMS',
        name: 'Amsterdam-Schiphol',
        city: 'Amsterdam',
        gmt: '+1.5',
        country: 'Netherlands'
      },
      to: {
        key: 'MAD',
        name: 'Barajas',
        city: 'Madrid',
        gmt: '+1.0',
        country: 'Spain'
      },
      takeoffDate: '2023-05-08T08:02:00.000Z',
      landingDate: '2023-05-08T10:47:00.000Z',
      price: {
        eur: 41,
        usd: 45.2271,
        rub: 3627.27,
        pln: 188.19
      },
      otherFlights: {
        2: {
          seats: {
            total: 202,
            avaible: 194
          },
          flightNumber: 'LD-7953',
          timeMins: 170,
          form: {
            key: 'AMS',
            name: 'Amsterdam-Schiphol',
            city: 'Amsterdam',
            gmt: '+1.0',
            country: 'Netherlands'
          },
          to: {
            key: 'MAD',
            name: 'Barajas',
            city: 'Madrid',
            gmt: '+1.0',
            country: 'Spain'
          },
          takeoffDate: '2023-05-11T05:11:00.000Z',
          landingDate: '2023-05-11T07:56:00.000Z',
          price: {
            eur: 49,
            usd: 54.051899999999996,
            rub: 4335.03,
            pln: 224.91
          }
        },
        4: {
          seats: {
            total: 696,
            avaible: 349
          },
          flightNumber: 'NQ-6139',
          timeMins: 162,
          form: {
            key: 'AMS',
            name: 'Amsterdam-Schiphol',
            city: 'Amsterdam',
            gmt: '+1.0',
            country: 'Netherlands'
          },
          to: {
            key: 'MAD',
            name: 'Barajas',
            city: 'Madrid',
            gmt: '+1.0',
            country: 'Spain'
          },
          takeoffDate: '2023-05-12T19:21:00.000Z',
          landingDate: '2023-05-12T22:06:00.000Z',
          price: {
            eur: 46,
            usd: 50.742599999999996,
            rub: 4069.62,
            pln: 211.14
          }
        },
        '-1': {
          seats: {
            total: 639,
            avaible: 316
          },
          flightNumber: 'TC-7228',
          timeMins: 168,
          form: {
            key: 'AMS',
            name: 'Amsterdam-Schiphol',
            city: 'Amsterdam',
            gmt: '+1.0',
            country: 'Netherlands'
          },
          to: {
            key: 'MAD',
            name: 'Barajas',
            city: 'Madrid',
            gmt: '+1.0',
            country: 'Spain'
          },
          takeoffDate: '2023-05-07T06:47:00.000Z',
          landingDate: '2023-05-07T09:32:00.000Z',
          price: {
            eur: 41,
            usd: 45.2271,
            rub: 3627.27,
            pln: 188.19
          }
        }
      }
    },
    {
      seats: {
        total: 125,
        avaible: 67
      },
      flightNumber: 'HC-8394',
      timeMins: 160,
      form: {
        key: 'MAD',
        name: 'Barajas',
        city: 'Madrid',
        gmt: '+1.0',
        country: 'Spain'
      },
      to: {
        key: 'AMS',
        name: 'Amsterdam-Schiphol',
        city: 'Amsterdam',
        gmt: '+1.0',
        country: 'Netherlands'
      },
      takeoffDate: '2023-10-13T07:19:00.000Z',
      landingDate: '2023-10-13T10:04:00.000Z',
      price: {
        eur: 343,
        usd: 378.3633,
        rub: 30345.21,
        pln: 1574.37
      },
      otherFlights: {
        1: {
          seats: {
            total: 421,
            avaible: 392
          },
          flightNumber: 'ZQ-891',
          timeMins: 160,
          form: {
            key: 'MAD',
            name: 'Barajas',
            city: 'Madrid',
            gmt: '+1.0',
            country: 'Spain'
          },
          to: {
            key: 'AMS',
            name: 'Amsterdam-Schiphol',
            city: 'Amsterdam',
            gmt: '+1.0',
            country: 'Netherlands'
          },
          takeoffDate: '2023-10-16T23:41:00.000Z',
          landingDate: '2023-10-17T02:26:00.000Z',
          price: {
            eur: 344,
            usd: 379.46639999999996,
            rub: 30433.68,
            pln: 1578.96
          }
        },
        2: {
          seats: {
            total: 438,
            avaible: 310
          },
          flightNumber: 'BT-8975',
          timeMins: 169,
          form: {
            key: 'MAD',
            name: 'Barajas',
            city: 'Madrid',
            gmt: '+1.0',
            country: 'Spain'
          },
          to: {
            key: 'AMS',
            name: 'Amsterdam-Schiphol',
            city: 'Amsterdam',
            gmt: '+1.0',
            country: 'Netherlands'
          },
          takeoffDate: '2023-10-17T07:06:00.000Z',
          landingDate: '2023-10-17T09:51:00.000Z',
          price: {
            eur: 341,
            usd: 376.1571,
            rub: 30168.27,
            pln: 1565.19
          }
        },
        5: {
          seats: {
            total: 209,
            avaible: 135
          },
          flightNumber: 'BF-1399',
          timeMins: 165,
          form: {
            key: 'MAD',
            name: 'Barajas',
            city: 'Madrid',
            gmt: '+1.0',
            country: 'Spain'
          },
          to: {
            key: 'AMS',
            name: 'Amsterdam-Schiphol',
            city: 'Amsterdam',
            gmt: '+1.0',
            country: 'Netherlands'
          },
          takeoffDate: '2023-10-18T08:14:00.000Z',
          landingDate: '2023-10-18T10:59:00.000Z',
          price: {
            eur: 328,
            usd: 361.8168,
            rub: 29018.16,
            pln: 1505.52
          }
        },
        '-4': {
          seats: {
            total: 98,
            avaible: 18
          },
          flightNumber: 'PB-110',
          timeMins: 165,
          form: {
            key: 'MAD',
            name: 'Barajas',
            city: 'Madrid',
            gmt: '+1.0',
            country: 'Spain'
          },
          to: {
            key: 'AMS',
            name: 'Amsterdam-Schiphol',
            city: 'Amsterdam',
            gmt: '+1.0',
            country: 'Netherlands'
          },
          takeoffDate: '2023-10-09T07:07:00.000Z',
          landingDate: '2023-10-09T09:52:00.000Z',
          price: {
            eur: 334,
            usd: 368.4354,
            rub: 29548.98,
            pln: 1533.06
          }
        },
        '-3': {
          seats: {
            total: 294,
            avaible: 197
          },
          flightNumber: 'MQ-78',
          timeMins: 164,
          form: {
            key: 'MAD',
            name: 'Barajas',
            city: 'Madrid',
            gmt: '+1.0',
            country: 'Spain'
          },
          to: {
            key: 'AMS',
            name: 'Amsterdam-Schiphol',
            city: 'Amsterdam',
            gmt: '+1.0',
            country: 'Netherlands'
          },
          takeoffDate: '2023-10-10T22:41:00.000Z',
          landingDate: '2023-10-11T01:26:00.000Z',
          price: {
            eur: 357,
            usd: 393.8067,
            rub: 31583.79,
            pln: 1638.6299999999999
          }
        },
        '-2': {
          seats: {
            total: 466,
            avaible: 250
          },
          flightNumber: 'EU-3258',
          timeMins: 165,
          form: {
            key: 'MAD',
            name: 'Barajas',
            city: 'Madrid',
            gmt: '+1.0',
            country: 'Spain'
          },
          to: {
            key: 'AMS',
            name: 'Amsterdam-Schiphol',
            city: 'Amsterdam',
            gmt: '+1.0',
            country: 'Netherlands'
          },
          takeoffDate: '2023-10-11T08:53:00.000Z',
          landingDate: '2023-10-11T11:38:00.000Z',
          price: {
            eur: 343,
            usd: 378.3633,
            rub: 30345.21,
            pln: 1574.37
          }
        },
        '-1': {
          seats: {
            total: 634,
            avaible: 312
          },
          flightNumber: 'MC-661',
          timeMins: 160,
          form: {
            key: 'MAD',
            name: 'Barajas',
            city: 'Madrid',
            gmt: '+1.0',
            country: 'Spain'
          },
          to: {
            key: 'AMS',
            name: 'Amsterdam-Schiphol',
            city: 'Amsterdam',
            gmt: '+1.0',
            country: 'Netherlands'
          },
          takeoffDate: '2023-10-12T00:48:00.000Z',
          landingDate: '2023-10-12T03:33:00.000Z',
          price: {
            eur: 362,
            usd: 399.3222,
            rub: 32026.14,
            pln: 1661.58
          }
        }
      }
    }
  ];
}

// export class FlightsComponent {
//   form!: FormGroup;

//   currentParams: any;

//   fromWhere!: string;

//   to!: string;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private flightsService: FlightsService,
//     private stepperService: StepperService,
//     private activatedRoute: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     this.createForm();

//     this.activatedRoute.queryParams.subscribe((params) => {
//       this.currentParams = params;
//       this.fromWhere = params['fromKey'];
//       this.to = params['toKey'];

//       console.log(this.currentParams);
//     });
//   }

//   createForm() {
//     this.form = this.fb.group({
//       flights: ['', Validators.required]
//     });
//   }

//   goBack(): void {
//     this.router.navigate([RoutesPath.MainPage]);
//   }

//   onSubmit(): void {
//     if (this.form.invalid) {
//       return;
//     }

//     const queryParams: Params = { flights: this.form.value.flights };

//     this.router.navigate([`/${RoutesPath.BookingPage}/${RoutesPath.BookingPagePassengers}`], {
//       queryParams,
//       queryParamsHandling: 'merge'
//     });

//     this.stepperService.next();

//     this.flightsService.updateFormState(this.form);
//   }
// }
