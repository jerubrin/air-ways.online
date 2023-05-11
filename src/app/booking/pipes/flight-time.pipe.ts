import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightTime'
})
export class FlightTimePipe implements PipeTransform {
  transform(value?: number): string {
    if (!value) {
      return '';
    }

    const hours = Math.trunc(value / 60);
    const mins = (value % 60);
    return `${hours}h ${(mins > 0) ? mins : `0${mins}`}m`;
  }
}
