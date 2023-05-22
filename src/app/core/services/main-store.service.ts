/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Flight } from 'src/app/booking/models/flight.model';
import { Passenger } from '../interfaces/pasanger';
import { Contacts } from '../interfaces/contacts';
import { Cart } from '../interfaces/cart';
import { QueryParamsService } from './query-params.service';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {
  private _cart: Cart[] = [];

  private _currentIndex = -1;

  flights: Flight[] = [];

  passengers: Passenger[] = [];

  contacts: Contacts = { countryCode: '', email: '', phone: '' };

  constructor(
    private queryParamsService: QueryParamsService
  ) {}

  addAllDataToCart() {
    // edit
    if (this._currentIndex !== -1) {
      const index = this._currentIndex;
      this._cart[index].flights = this.flights;
      this._cart[index].passengers = this.passengers;
      this._cart[index].contacts = this.contacts;
      this._cart[index].queryParams = this.queryParamsService.getQueryParams();
      return;
    }
    // add new
    this._cart.push({
      flights: this.flights,
      passengers: this.passengers,
      contacts: this.contacts,
      queryParams: this.queryParamsService.getQueryParams()
    });
    this.flights = [];
    this.passengers = [];
    this.queryParamsService.setInitialQueryParams();
  }

  setDataFromCart(index: number) {
    if (index <= this._cart.length || index < 0) {
      return;
    }

    this.flights = this._cart[index].flights;
    this.passengers = this._cart[index].passengers;
    this.contacts = this._cart[index].contacts;
    this.queryParamsService.updateQueryParamOnCurrentPage(this._cart[index].queryParams);
    this._currentIndex = index;
  }

  removeFromCart(index: number) {
    if (index <= this._cart.length || index < 0) {
      return;
    }

    this._cart = this._cart.filter((_, i) => i !== index);
  }
}
