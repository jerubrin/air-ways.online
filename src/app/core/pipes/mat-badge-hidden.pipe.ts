import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matBadgeHidden'
})
export class MatBadgeHiddenPipe implements PipeTransform {
  transform(value: number | null | undefined): boolean {
    return !value || value < 0;
  }
}
