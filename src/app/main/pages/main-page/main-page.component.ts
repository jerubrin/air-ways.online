import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { FlightSearch } from 'src/app/shared/interfaces/flight-search.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  queryParamsInitial: FlightSearch = {
    fromKey: '',
    toKey: '',
    forwardDate: new Date().toISOString(),
    backDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    adults: 1,
    children: 0,
    infants: 0
  };

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
        if (
          params['fromKey'] ||
          params['toKey'] ||
          params['forwardDate'] ||
          params['backDate'] ||
          params['adults'] ||
          params['children'] ||
          params['infants']
        ) {
          this.queryParamsInitial = {
            fromKey: params['fromKey'] || '',
            toKey: params['toKey'] || '',
            forwardDate: params['forwardDate'] || new Date().toISOString(),
            backDate:
              params['backDate'] ||
              new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
            adults: params['adults'] || 1,
            children: params['children'] || 0,
            infants: params['infants'] || 0
          };
          this.updateQueryParams();
        } else {
          this.updateQueryParams();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private updateQueryParams(): void {
    this.router.navigate([], {
      queryParams: this.queryParamsInitial,
      queryParamsHandling: 'merge'
    });
  }
}
