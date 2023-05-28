import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateFormatType } from '../../shared/types/DateFormatType';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {
  private selectedDateFormatSubject = new BehaviorSubject<DateFormatType>('MM/DD/YYYY');

  selectedDateFormat$ = this.selectedDateFormatSubject.asObservable();

  setSelectedDateFormat(dateFormat: DateFormatType): void {
    this.selectedDateFormatSubject.next(dateFormat);
  }
}
