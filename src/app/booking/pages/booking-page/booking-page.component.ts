import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit, OnDestroy {
  isRoundTrip!: boolean;

  fromWhereInitialValue!: string;

  toWhereInitialValue!: string;

  departureDateInitialValue!: Date | null;

  returnDateInitialValue!: Date | null;

  adultsInitialValue!: number;

  childrenInitialValue!: number;

  infantsInitialValue!: number;

  private subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((currentParams) => {
        this.setInitialValuesFromQueryParams(currentParams);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private setInitialValuesFromQueryParams(params: any): void {
    this.isRoundTrip = Boolean(params.backDate);

    this.fromWhereInitialValue =
      params.fromWhere && params.fromKey ? `${params.fromWhere} ${params.fromKey}` : '';
    this.toWhereInitialValue =
      params.toWhere && params.toKey ? `${params.toWhere} ${params.toKey}` : '';
    this.departureDateInitialValue = params.forwardDate ? new Date(params.forwardDate) : null;
    this.returnDateInitialValue = params.backDate ? new Date(params.backDate) : null;
    this.adultsInitialValue = params.adults ? Number(params.adults) : 1;
    this.childrenInitialValue = params.children ? Number(params.children) : 0;
    this.infantsInitialValue = params.infants ? Number(params.infants) : 0;
  }

  showEditForm?: boolean;

  editClick() {
    this.showEditForm = !this.showEditForm;
  }
}
