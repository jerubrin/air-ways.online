/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Flight } from 'src/app/booking/models/flight.model';
import { PassengerReview } from 'src/app/shared/interfaces/passenger-review';
import { Observable, ReplaySubject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Cart } from '../interfaces/cart';
import { QueryParamsService } from './query-params.service';
import { LocalStorageService } from './local-storage.service';
import { PassengersResultData } from '../interfaces/passengers-result-data';
import { getPassengers } from '../helpers/passengers-converter';
import { LocalStorageKeys } from '../data/enams/local-storage.enum';
import { RandomData } from '../interfaces/random-data';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {
  private _cart: Cart[] = [];

  private _currentCadrItemId = '';

  private _passengersReview?: PassengerReview[];

  private _cartSize$ = new ReplaySubject<number>(1);

  private _cart$ = new ReplaySubject<Cart[]>(1);

  get cartSize$(): Observable<number> {
    return this._cartSize$;
  }

  get cart$(): Observable<Cart[]> {
    return this._cart$;
  }

  get flightResults(): Flight[] | undefined {
    const json = sessionStorage.getItem(LocalStorageKeys.FlightResults);
    if (!json) {
      return undefined;
    }
    try {
      return JSON.parse(json);
    } catch {
      return undefined;
    }
  }

  set flightResults(value: Flight[] | undefined) {
    if (!value) {
      sessionStorage.removeItem(LocalStorageKeys.FlightResults);
    }
    sessionStorage.setItem(
      LocalStorageKeys.FlightResults,
      JSON.stringify(value)
    );
  }

  get flights(): Flight[] {
    const json = sessionStorage.getItem(LocalStorageKeys.Flights);
    if (!json) {
      return [];
    }
    try {
      return JSON.parse(json);
    } catch {
      return [];
    }
  }

  set flights(value: Flight[]) {
    sessionStorage.setItem(
      LocalStorageKeys.Flights,
      JSON.stringify(value)
    );
  }

  get passengersResult(): PassengersResultData {
    const json = sessionStorage.getItem(LocalStorageKeys.PassengersResult);
    const initialValue = {
      adults: [],
      children: [],
      infants: [],
      contactDetailsData: {
        countryCode: '',
        phone: '',
        email: ''
      }
    };
    if (!json) {
      return initialValue;
    }
    try {
      return JSON.parse(json);
    } catch {
      return initialValue;
    }
  }

  set passengersResult(value: PassengersResultData) {
    this._passengersReview = [];
    sessionStorage.setItem(
      LocalStorageKeys.PassengersResult,
      JSON.stringify(value)
    );
  }

  get passengersReview(): PassengerReview[] {
    if (this._passengersReview?.length) {
      return this._passengersReview;
    }
    this._passengersReview = getPassengers(this.passengersResult, this.randomData);
    return this._passengersReview;
  }

  get randomData(): RandomData {
    const json = sessionStorage.getItem(LocalStorageKeys.RandomData);
    const initialValue = {
      hasBaggage: Math.random() > 0.5,
      hasCabinBag: Math.random() > 0.5,
      symbols: Math.random() > 0.5
        ? ['A', 'B', 'C', 'D', 'E', 'F']
        : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      seatNum: Math.trunc(Math.random() * 60) + 1,
    };
    if (!json) {
      this.randomData = initialValue;
      return initialValue;
    }
    try {
      return JSON.parse(json);
    } catch {
      this.randomData = initialValue;
      return initialValue;
    }
  }

  set randomData(value: RandomData) {
    this._passengersReview = [];
    sessionStorage.setItem(
      LocalStorageKeys.RandomData,
      JSON.stringify(value)
    );
  }

  set queryParams(value: any) {
    this._passengersReview = [];
    if (value) {
      sessionStorage.setItem(
        LocalStorageKeys.QueryParams,
        JSON.stringify(value)
      );
    }
  }

  get queryParams(): any {
    const json = sessionStorage.getItem(LocalStorageKeys.QueryParams);
    if (!json) {
      return {};
    }
    try {
      return JSON.parse(json);
    } catch {
      return {};
    }
  }

  set selectedFlights(value: number[]) {
    if (value) {
      sessionStorage.setItem(
        LocalStorageKeys.SelectedFlights,
        JSON.stringify(value)
      );
    }
  }

  get selectedFlights(): any {
    const json = sessionStorage.getItem(LocalStorageKeys.SelectedFlights);
    if (!json) {
      return [0, 0];
    }
    try {
      return JSON.parse(json);
    } catch {
      return [0, 0];
    }
  }

  constructor(
    private queryParamsService: QueryParamsService,
    private localStorageService: LocalStorageService
  ) {
    this._cart = localStorageService.getCart();
    this._cartSize$.next(this.cart.length);
    this._cart$.next(this.cart);
    this._currentCadrItemId = localStorageService.getSelectedIndex();
  }

  private updateLocalStorage() {
    this.localStorageService.setCart(this._cart, this._currentCadrItemId);
  }

  addAllDataToCart() {
    if (!this.passengersResult) return;
    // edit
    const cartItem = this._cart.find((item) => item.id === this._currentCadrItemId);
    if (this._currentCadrItemId !== '' && cartItem) {
      cartItem.flights = this.flights;
      cartItem.passengersResult = this.passengersResult;
      cartItem.queryParams = this.queryParamsService.getQueryParams();
      return;
    }
    // add new
    this._cart.push({
      id: uuid(),
      flights: this.flights,
      passengersResult: this.passengersResult,
      queryParams: this.queryParamsService.getQueryParams()
    });
    this.flights = [];
    // this.passengersResult = undefined;
    this.queryParamsService.setInitialQueryParams();
    this._currentCadrItemId = '';
    this.updateLocalStorage();
    this._cartSize$.next(this.cart.length);
    this._cart$.next(this.cart);
  }

  setDataFromCart(id: string) {
    const cartItem = this._cart.find((item) => item.id === id);
    if (!cartItem) {
      return;
    }

    this.flights = cartItem.flights;
    this.passengersResult = cartItem.passengersResult;
    this.queryParamsService.updateQueryParamOnCurrentPage(cartItem.queryParams);
    this._currentCadrItemId = id;
    this.updateLocalStorage();
    this._cartSize$.next(this.cart.length);
    this._cart$.next(this.cart);
  }

  removeFromCart(id: string) {
    this._cart = this._cart.filter((item) => item.id === id);
    this.updateLocalStorage();
    this._cartSize$.next(this.cart.length);
    this._cart$.next(this.cart);
  }

  get cart(): Cart[] {
    return this._cart;
  }
}
