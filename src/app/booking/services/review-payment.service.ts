/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import { Gender } from 'src/app/core/interfaces/passengers-data';
import { MainStoreService } from 'src/app/core/services/main-store.service';
import { LongPrice } from 'src/app/shared/interfaces/long-price';
import { TotalPrices } from 'src/app/shared/interfaces/total-prices';
import { Price } from '../models/price.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewPaymentService {
  private formValid = false;

  updateFormState(form: FormGroup): void {
    this.formValid = form.valid;
  }

  isFormValid(): boolean {
    return this.formValid;
  }

  constructor(private store: MainStoreService) {}

  getPrices(): TotalPrices {
    return {
      adults: this.getPrice(
        this.getPricesSum(
          this.store?.flights[0]?.price,
          this.store?.flights[1]?.price,
          this.store.passengersResult?.adults.length,
          this.store.passengersResult?.adults.reduce(
            (sum, p) => p.checkedInBaggage ? sum + 1 : sum, 0
          )
        )
      ),
      adultsCount: this.store.passengersResult?.adults.length ?? 0,
      children: this.getPrice(
        this.getPricesSum(
          this.store?.flights[0]?.price,
          this.store?.flights[1]?.price,
          this.store.passengersResult?.children.length,
          this.store.passengersResult?.children.reduce(
            (sum, p) => p.checkedInBaggage ? sum + 1 : sum, 0
          )
        ),
        0.6
      ),
      childrenCount: this.store.passengersResult?.children.length ?? 0,
      infants: this.getPrice(
        this.getPricesSum(
          this.store?.flights[0]?.price,
          this.store?.flights[1]?.price,
          this.store.passengersResult?.infants.length
        ),
        0.3
      ),
      infantsCount: this.store.passengersResult?.infants.length ?? 0
    };
  }

  private getPrice(price: Price, percentIndex?: number): LongPrice {
    const fullPrice = {
      eur: price.eur * (percentIndex ?? 1),
      pln: price.pln * (percentIndex ?? 1),
      usd: price.usd * (percentIndex ?? 1),
      rub: price.rub * (percentIndex ?? 1)
    };
    const tax: Price = {
      eur: fullPrice.eur * 0.11,
      pln: fullPrice.pln * 0.11,
      usd: fullPrice.usd * 0.11,
      rub: fullPrice.rub * 0.11
    };
    const fare: Price = {
      eur: fullPrice.eur - tax.eur,
      pln: fullPrice.pln - tax.pln,
      usd: fullPrice.usd - tax.usd,
      rub: fullPrice.rub - tax.rub
    };
    return { fullPrice, fare, tax };
  }

  private getPricesSum(priceOne?: Price, priceTwo?: Price, factor = 0, baggage = 0): Price {
    return {
      eur: ((priceOne?.eur ?? 0) + (priceTwo?.eur ?? 0)) * factor + ((priceOne?.eur ?? 0) * baggage * 0.2),
      usd: ((priceOne?.usd ?? 0) + (priceTwo?.usd ?? 0)) * factor + ((priceOne?.usd ?? 0) * baggage * 0.2),
      pln: ((priceOne?.pln ?? 0) + (priceTwo?.pln ?? 0)) * factor + ((priceOne?.pln ?? 0) * baggage * 0.2),
      rub: ((priceOne?.rub ?? 0) + (priceTwo?.rub ?? 0)) * factor + ((priceOne?.rub ?? 0) * baggage * 0.2)
    };
  }
}
