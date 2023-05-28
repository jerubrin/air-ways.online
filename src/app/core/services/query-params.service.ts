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
    this.setQueryParams(this.queryParamsInitial);
  }

  updateQueryParamOnCurrentPage(queryParamsToUpdate: Partial<QueryParams>): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((currentParams) => {
      const updatedParams: Partial<QueryParams> = {
        ...currentParams,
        ...queryParamsToUpdate
      };

      this.setQueryParams(updatedParams);
    });
  }

  private setQueryParams(params: Partial<QueryParams>): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  getQueryParams(): QueryParams {
    return this.activatedRoute.snapshot.queryParams as QueryParams;
  }
}
