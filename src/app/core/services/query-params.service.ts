import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { take } from 'rxjs';

import { QueryParams } from 'src/app/shared/interfaces/query-params.model';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {
  private queryParamsInitial: QueryParams = {
    fromWhere: '',
    toWhere: '',
    fromKey: '',
    toKey: '',
    forwardDate: moment().format(),
    backDate: moment().add(7, 'days').format(),
    adults: '1',
    children: '0',
    infants: '0'
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  setInitialQueryParams(): void {
    this.router.navigate([], {
      queryParams: this.queryParamsInitial,
      queryParamsHandling: 'merge'
    });
  }

  setQueryParamsToCurrentPage(params: QueryParams): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  hasQueryParams(queryParams: string[]): boolean {
    const currentParams = this.activatedRoute.snapshot.queryParams;
    return queryParams.some((param) => !!currentParams[param]);
  }

  updateQueryParam(params: { [param: string]: string }): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((queryParams) => {
      const updatedParams = { ...queryParams, ...params };
      this.router.navigate([], { queryParams: updatedParams, queryParamsHandling: 'merge' });
    });
  }
}
