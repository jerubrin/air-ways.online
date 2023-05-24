import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cart } from 'src/app/core/interfaces/cart';

@Pipe({
  name: 'selectedCount'
})
export class SelectedCountPipe implements PipeTransform {
  transform(value: Observable<Cart[] | null>): Observable<number> {
    return value.pipe(
      map((items) => (items
        ? items.reduce((sum, item) => (item.isChecked ? sum + 1 : sum), 0)
        : 0
      ))
    );
  }
}
