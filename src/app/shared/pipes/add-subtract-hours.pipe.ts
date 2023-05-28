import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addSubtractHours'
})
export class AddSubtractHoursPipe implements PipeTransform {
  transform(dateString: string, hours: number): string {
    const date = new Date(dateString);
    date.setHours(date.getHours() + hours);
    return date.toISOString();
  }
}
