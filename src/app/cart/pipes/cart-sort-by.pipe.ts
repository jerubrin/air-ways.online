import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cart } from 'src/app/core/interfaces/cart';
import { SortBy } from '../enum/sort-by';
import { sortByDate, sortByFlight, sortByNumber, sortByPrice, sortByType } from '../helpers/sort.helpers';

@Pipe({
  name: 'cartSortBy'
})
export class CartSortByPipe implements PipeTransform {
  transform(
    cartItems: Cart[] | null,
    sortBy: Observable<SortBy>
  ): Observable<Cart[] | null | undefined> {
    return sortBy.pipe(
      map((sort) => {
        switch (sort) {
          case SortBy.NumberUp: return cartItems?.sort(sortByNumber);
          case SortBy.NumberDown: return cartItems?.sort((a, b) => sortByNumber(a, b) * (-1));
          case SortBy.FlightUp: return cartItems?.sort(sortByFlight);
          case SortBy.FlightDown: return cartItems?.sort((a, b) => sortByFlight(a, b) * (-1));
          case SortBy.TypeUp: return cartItems?.sort(sortByType);
          case SortBy.TypeDown: return cartItems?.sort((a, b) => sortByType(a, b) * (-1));
          case SortBy.DataUp: return cartItems?.sort(sortByDate);
          case SortBy.DataDown: return cartItems?.sort((a, b) => sortByDate(a, b) * (-1));
          case SortBy.PriceUp: return cartItems?.sort(sortByPrice);
          case SortBy.PriceDown: return cartItems?.sort((a, b) => sortByPrice(a, b) * (-1));
          default: return cartItems;
        }
      })
    );
  }
}
