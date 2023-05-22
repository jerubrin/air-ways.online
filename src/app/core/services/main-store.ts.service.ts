/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Flight } from 'src/app/booking/models/flight.model';
import { Passenger } from '../interfaces/pasanger';
import { Contacts } from '../interfaces/contacts';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class MainStoreTsService {
  private flights: Flight[] = [];

  private passengers: Passenger[] = [];

  private contacts: Contacts = { countryCode: '', email: '', phone: '' };

  private _cart: Cart[] = [];

  addAllDataToCart() {
    this._cart.push({
      flights: this.flights,
      passengers: this.passengers,
      contacts: this.contacts,
    });
  }

  setDataFromCart(index: number) {
    if (index <= this._cart.length || index < 0) {
      return;
    }

    this.flights = this._cart[index].flights;
    this.passengers = this._cart[index].passengers;
    this.contacts = this._cart[index].contacts;
  }

  removeFromCart(index: number) {
    if (index <= this._cart.length || index < 0) {
      return;
    }

    this._cart = this._cart.filter((_, i) => i !== index);
  }
}
