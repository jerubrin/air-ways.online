import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, Subscription, take } from 'rxjs';
import { QueryParamsService } from 'src/app/core/services/query-params.service';
import { QueryParams } from '../../../shared/interfaces/query-params.model';
import { DatepickerRangeComponent } from '../../../shared/components/datepicker-range/datepicker-range.component';
import { DatepickerComponent } from '../../../shared/components/datepicker/datepicker.component';
import { DestinationFormFieldComponent } from '../../../shared/components/destination-form-field/destination-form-field.component';
import { PassengersFormFieldComponent } from '../../../shared/components/passengers-form-field/passengers-form-field.component';

@Component({
  selector: 'app-edit-flight-search-form',
  templateUrl: './edit-flight-search-form.component.html',
  styleUrls: ['./edit-flight-search-form.component.scss']
})
export class EditFlightSearchFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('fromWhere') fromWhere!: DestinationFormFieldComponent;

  @ViewChild('destination') destination!: DestinationFormFieldComponent;

  @ViewChild(DatepickerRangeComponent) datepickerRange!: DatepickerRangeComponent;

  @ViewChild(DatepickerComponent) oneWayDatepicker!: DatepickerComponent;

  @ViewChild(PassengersFormFieldComponent) passengers!: PassengersFormFieldComponent;

  isRoundTrip!: boolean;

  fromWhereInitialValue!: string;

  toWhereInitialValue!: string;

  departureDateInitialValue!: Date | null;

  returnDateInitialValue!: Date | null;

  adultsInitialValue!: number;

  childrenInitialValue!: number;

  infantsInitialValue!: number;

  queryParamsCurrent!: QueryParams;

  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private queryParamsService: QueryParamsService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
        this.setInitialValuesFromQueryParams(params);
      })
    );
  }

  private setInitialValuesFromQueryParams(params: any): void {
    this.isRoundTrip = Boolean(params.backDate);

    this.fromWhereInitialValue = params.fromWhere || '';
    this.toWhereInitialValue = params.toWhere || '';
    this.departureDateInitialValue = params.forwardDate ? new Date(params.forwardDate) : null;
    this.returnDateInitialValue = params.backDate ? new Date(params.backDate) : null;
    this.adultsInitialValue = params.adults ? Number(params.adults) : 1;
    this.childrenInitialValue = params.children ? Number(params.children) : 0;
    this.infantsInitialValue = params.infants ? Number(params.infants) : 0;
  }

  ngAfterViewInit(): void {
    if (this.fromWhere) {
      this.subscriptions.push(
        this.fromWhere.destinationControl.valueChanges.subscribe((value) => {
          if (this.fromWhere.destinationControl.valid) {
            this.fromWhere.destinationControl.markAsTouched();
            this.queryParamsService.updateQueryParam({ fromWhere: value.city, fromKey: value.key });
          }
        })
      );
    }
    if (this.destination) {
      this.subscriptions.push(
        this.destination.destinationControl.valueChanges.subscribe((value) => {
          if (this.destination.destinationControl.valid) {
            this.destination.destinationControl.markAsTouched();
            this.queryParamsService.updateQueryParam({ toWhere: value.city, toKey: value.key });
          }
        })
      );
    }
    if (this.datepickerRange) {
      this.subscriptions.push(
        combineLatest([
          this.datepickerRange.departureDateControl.valueChanges,
          this.datepickerRange.returnDateControl.valueChanges
        ]).subscribe(([departureValue, returnValue]) => {
          if (
            this.datepickerRange.departureDateControl.valid &&
            this.datepickerRange.returnDateControl.valid
          ) {
            this.datepickerRange.departureDateControl.markAsTouched();
            this.datepickerRange.returnDateControl.markAsTouched();
            this.queryParamsService.updateQueryParam({
              forwardDate: moment(departureValue).format(),
              backDate: moment(returnValue).format()
            });
          }
        })
      );
    }

    if (this.oneWayDatepicker) {
      this.subscriptions.push(
        this.oneWayDatepicker.dateControl.valueChanges.subscribe((value) => {
          if (this.oneWayDatepicker.dateControl.valid) {
            this.oneWayDatepicker.dateControl.markAsTouched();
            this.queryParamsService.updateQueryParam({
              forwardDate: moment(value).format()
            });
          }
        })
      );
    }

    if (this.passengers) {
      this.subscriptions.push(
        this.passengers.passengerCountsFormGroup.valueChanges.subscribe((value) => {
          this.queryParamsService.updateQueryParam({
            adults: value.adults,
            children: value.children,
            infants: value.infants
          });
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
