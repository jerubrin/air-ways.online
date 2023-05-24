/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortBy } from '../enum/sort-by';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _sortBy$ = new BehaviorSubject<SortBy>(SortBy.Default);

  get sortBy$(): Observable<SortBy> {
    return this._sortBy$;
  }

  set sortBy(value: SortBy) {
    this._sortBy$.next(value);
  }
}
