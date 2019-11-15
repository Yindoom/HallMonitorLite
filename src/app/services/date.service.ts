import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() {}

  format(toFormat: Date): Date {
    const datePipe = new DatePipe(navigator.language);
    const dateFormat = 'yyyy-MM-dd';
    return new Date(datePipe.transform(toFormat, dateFormat));
  }
}
