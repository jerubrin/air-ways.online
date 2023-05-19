import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gmt'
})
export class GmtPipe implements PipeTransform {
  transform(value?: string): string {
    return `UTC ${value?.split('.').filter((ch, i) => !(ch === '0' && i === 1)).join('.')}`;
  }
}
