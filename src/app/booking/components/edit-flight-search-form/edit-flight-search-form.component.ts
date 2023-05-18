import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { QueryParamsService } from 'src/app/core/services/query-params.service';

import { Passengers } from 'src/app/shared/interfaces/passengers.model';

@Component({
  selector: 'app-edit-flight-search-form',
  templateUrl: './edit-flight-search-form.component.html',
  styleUrls: ['./edit-flight-search-form.component.scss']
})
export class EditFlightSearchFormComponent {
  @Input() showEditForm?: boolean;

  @Input() isRoundTrip!: boolean;

  @Input() fromWhereInitialValue!: string;

  @Input() toWhereInitialValue!: string;

  @Input() departureDateInitialValue!: Date | null;

  @Input() returnDateInitialValue!: Date | null;

  @Input() adultsInitialValue!: number;

  @Input() childrenInitialValue!: number;

  @Input() infantsInitialValue!: number;

  constructor(private queryParamsService: QueryParamsService) {}

  onValidValueFrom(value: string): void {
    const [city, key] = value.split(' ');
    this.queryParamsService.updateQueryParamOnCurrentPage({ fromWhere: city, fromKey: key });
  }

  onValidValueDestination(value: string): void {
    const [city, key] = value.split(' ');
    this.queryParamsService.updateQueryParamOnCurrentPage({ toWhere: city, toKey: key });
  }

  onValidDateRange(dateRange: { departureDate: Date; returnDate: Date }): void {
    this.queryParamsService.updateQueryParamOnCurrentPage({
      forwardDate: moment(dateRange.departureDate).format(),
      backDate: moment(dateRange.returnDate).format()
    });
  }

  onValidDate(date: Date): void {
    this.queryParamsService.updateQueryParamOnCurrentPage({
      forwardDate: moment(date).format(),
      backDate: ''
    });
  }

  onPassengerCountChanged(passengerCount: Passengers): void {
    const { adults, children, infants } = passengerCount;
    this.queryParamsService.updateQueryParamOnCurrentPage({
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString()
    });
  }
}
