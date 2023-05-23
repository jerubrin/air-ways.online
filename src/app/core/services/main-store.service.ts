/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Flight } from 'src/app/booking/models/flight.model';
import { Cart } from '../interfaces/cart';
import { QueryParamsService } from './query-params.service';
import { LocalStorageService } from './local-storage.service';
import { PassengersResultData } from '../interfaces/passengers-result-data';
import { PassengerReview } from 'src/app/shared/interfaces/passenger-review';
import { getPassengers } from '../helpers/passengers-converter';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {
  private _cart: Cart[] = [];

  private _currentIndex = -1;

  private _passengersReview?: PassengerReview[]

  flights: Flight[] = [];

  passengersResult: PassengersResultData = {
    adults: [],
    children: [],
    infants: [],
    contactDetailsData: {
      countryCode: '',
      phone: '',
      email: ''
    }
  };


  get passengersReview(): PassengerReview[] {
    if (this._passengersReview) {
      return this._passengersReview;
    }
    this._passengersReview = getPassengers(this.passengersResult);
    return this._passengersReview;
  }

  constructor(
    private queryParamsService: QueryParamsService,
    private localStorageService: LocalStorageService
  ) {
    this._cart = localStorageService.getCart();
    this._currentIndex = localStorageService.getSelectedIndex();
  }

  private updateLocalStorage() {
    this.localStorageService.setCart(this._cart, this._currentIndex);
  }

  addAllDataToCart() {
    if (!this.passengersResult) return;
    // edit
    if (this._currentIndex !== -1) {
      const index = this._currentIndex;
      this._cart[index].flights = this.flights;
      this._cart[index].passengersResult = this.passengersResult;
      this._cart[index].queryParams = this.queryParamsService.getQueryParams();
      return;
    }
    // add new
    this._cart.push({
      flights: this.flights,
      passengersResult: this.passengersResult,
      queryParams: this.queryParamsService.getQueryParams()
    });
    this.flights = [];
    // this.passengersResult = undefined;
    this.queryParamsService.setInitialQueryParams();
    this.updateLocalStorage();
  }

  setDataFromCart(index: number) {
    if (index <= this._cart.length || index < 0) {
      return;
    }

    this.flights = this._cart[index].flights;
    this.passengersResult = this._cart[index].passengersResult;
    this.queryParamsService.updateQueryParamOnCurrentPage(this._cart[index].queryParams);
    this._currentIndex = index;
    this.updateLocalStorage();
  }

  removeFromCart(index: number) {
    if (index <= this._cart.length || index < 0) {
      return;
    }

    this._cart = this._cart.filter((_, i) => i !== index);
    this.updateLocalStorage();
  }
}
