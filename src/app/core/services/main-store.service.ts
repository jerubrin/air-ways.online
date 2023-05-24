/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Flight } from 'src/app/booking/models/flight.model';
import { PassengerReview } from 'src/app/shared/interfaces/passenger-review';
import { v4 as uuid } from 'uuid';
import { LocalStorageKeys } from '../data/enams/local-storage.enum';
import { getTotalPrice } from '../helpers/get-total-price';
import { getPassengers } from '../helpers/passengers-converter';
import { Cart } from '../interfaces/cart';
import { CartPriceData } from '../interfaces/cart-price-data';
import { PassengersResultData } from '../interfaces/passengers-result-data';
import { RandomData } from '../interfaces/random-data';
import { LocalStorageService } from './local-storage.service';
import { QueryParamsService } from './query-params.service';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {
  private _cart: Cart[] = [];

  private _currentCartItemId = '';

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
    sessionStorage.setItem(LocalStorageKeys.FlightResults, JSON.stringify(value));
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
    sessionStorage.setItem(LocalStorageKeys.Flights, JSON.stringify(value));
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
    sessionStorage.setItem(LocalStorageKeys.PassengersResult, JSON.stringify(value));
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
      symbols:
        Math.random() > 0.5
          ? ['A', 'B', 'C', 'D', 'E', 'F']
          : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      seatNum: Math.trunc(Math.random() * 60) + 1
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
    sessionStorage.setItem(LocalStorageKeys.RandomData, JSON.stringify(value));
  }

  set queryParams(value: any) {
    this._passengersReview = [];
    if (value) {
      sessionStorage.setItem(LocalStorageKeys.QueryParams, JSON.stringify(value));
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
      sessionStorage.setItem(LocalStorageKeys.SelectedFlights, JSON.stringify(value));
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
    this.getCartDataFromLocalStorage();
  }

  private getCartDataFromLocalStorage() {
    this._cart = this.localStorageService.getCart();
    this._cartSize$.next(this.cart.length);
    this._cart$.next(this.cart);
    this._currentCartItemId = this.localStorageService.getSelectedIndex();
  }

  private updateLocalStorage() {
    this.localStorageService.setCart(this._cart, this._currentCartItemId);
  }

  addAllDataToCart() {
    const cartPriceData: CartPriceData = {
      adults: this.passengersResult.adults.length,
      children: this.passengersResult.children.length,
      infants: this.passengersResult.infants.length,
      totalPrice: { eur: 0, usd: 0, pln: 0, rub: 0 },
    };
    cartPriceData.totalPrice = getTotalPrice(cartPriceData, this.flights);
    if (!this.passengersResult) return;
    // edit
    const cartItem = this._cart.find((item) => item.id === this._currentCartItemId);
    if (this._currentCartItemId !== '' && cartItem) {
      cartItem.flights = this.flights;
      cartItem.passengersResult = this.passengersResult;
      cartItem.queryParams = this.queryParamsService.getQueryParams();
      cartItem.cartPriceData = cartPriceData;
    } else {
      // add new
      this._cart.push({
        id: uuid(),
        isChecked: true,
        cartPriceData,
        flights: this.flights,
        passengersResult: this.passengersResult,
        queryParams: this.queryParamsService.getQueryParams()
      });
    }
    this.flights = [];
    // this.passengersResult = undefined;
    this.queryParamsService.setInitialQueryParams();
    this._currentCartItemId = '';
    this.flightResults = [];
    this.flights = [];
    this.passengersResult = {
      adults: [],
      children: [],
      infants: [],
      contactDetailsData: {
        countryCode: '',
        phone: '',
        email: ''
      }
    };
    this._passengersReview = [];
    sessionStorage.removeItem(LocalStorageKeys.RandomData);
    const random = this.randomData;
    this.randomData = random;
    this.queryParams = {};
    this.selectedFlights = [0, 0];
    this.updateLocalStorage();
    sessionStorage.clear();
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
    this._currentCartItemId = id;
    this.updateLocalStorage();
    this._cartSize$.next(this.cart.length);
    this._cart$.next(this.cart);
  }

  removeFromCart(id: string) {
    this._cart = this._cart.filter((item) => item.id !== id);
    this.updateLocalStorage();
    this._cartSize$.next(this.cart.length);
    this._cart$.next(this.cart);
  }

  get cart(): Cart[] {
    return this._cart;
  }

  selectCartItem(id: string, value: boolean) {
    const cartItem = this._cart.find((item) => item.id === id);
    if (cartItem) {
      cartItem.isChecked = value;
      this.updateLocalStorage();
      this._cart$.next(this.cart);
    }
  }
}
