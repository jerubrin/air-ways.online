import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, first, Observable } from 'rxjs';

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

  queryParamsSubject: BehaviorSubject<QueryParams> = new BehaviorSubject<QueryParams>(
    {} as QueryParams
  );

  queryParams$: Observable<QueryParams> = this.queryParamsSubject.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const currentParams = this.getQueryParamsFromSessionStorage() || this.getQueryParams();

    if (Object.keys(currentParams).length > 0) {
      this.queryParamsSubject.next(currentParams as QueryParams);
    } else {
      this.setInitialQueryParams();
    }
  }

  setInitialQueryParams(): void {
    this.setQueryParams(this.queryParamsInitial);

    this.queryParamsSubject.next(this.queryParamsInitial);

    this.saveQueryParamsToSessionStorage(this.queryParamsInitial);
  }

  updateQueryParamsSubject(queryParamsToUpdate: Partial<QueryParams>): void {
    this.queryParamsSubject.pipe(first()).subscribe((queryParams) => {
      const updatedParams: QueryParams = { ...queryParams, ...queryParamsToUpdate };

      this.queryParamsSubject.next(updatedParams);

      this.saveQueryParamsToSessionStorage(updatedParams);
    });
  }

  updateQueryParamOnCurrentPage(queryParamsToUpdate: Partial<QueryParams>): void {
    this.updateQueryParamsSubject(queryParamsToUpdate);

    this.queryParamsSubject.pipe(first()).subscribe((queryParams) => {
      this.setQueryParams(queryParams);
    });
  }

  getQueryParams(): QueryParams {
    return this.activatedRoute.snapshot.queryParams as QueryParams;
  }

  private setQueryParams(params: QueryParams): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  private saveQueryParamsToSessionStorage(queryParams: QueryParams): void {
    sessionStorage.setItem('queryParams', JSON.stringify(queryParams));
  }

  private getQueryParamsFromSessionStorage(): QueryParams | null {
    const storedParams = sessionStorage.getItem('queryParams');
    return storedParams ? JSON.parse(storedParams) : null;
  }
}
