import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {DeviceOutputService} from '../../services/model-services/device-output.service';
import {DateService} from '../../services/date.service';
import {MatDialog} from '@angular/material';
import {UserCreateUpdateComponent} from '../user-create-update/user-create-update.component';
import {DeviceOutputTableDetailsComponent} from '../device-output-table-details/device-output-table-details.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  headers = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  rows = [];
  orderNumber = 0;
  dayOfTheWeek = 1;
  pickedNumber: number;
  defaultToDate = new Date();
  defaultFromDate;
  datePipe = new DatePipe('en-US');

  constructor(private deviceOutputService: DeviceOutputService, private dateService: DateService, private dialog: MatDialog) {}

  ngOnInit() {
    this.changeTimeForFromDate();
    this.getDeviceOutputInTimeInterval(this.defaultFromDate, this.defaultToDate , 60);
    this.fillTableWithDates(60);
  }

  changeTimeForFromDate() {
    this.defaultFromDate = new Date(new Date().setDate(new Date().getDate() - 6));
    this.defaultFromDate.setHours(0, 0, 0);
    this.dayOfTheWeek = this.defaultFromDate.getDay();
  }

  getDaysForCurrentWeek(): any[] {
 /*   if (this.defaultToDate === new Date()) {*/
      this.dayOfTheWeek = this.defaultToDate.getDay();
      let currentDay = this.dayOfTheWeek;
      let newDateArray = [''];
      for (let i = currentDay + 1 ; i < 8; i++) {
        newDateArray.push(this.headers[i]);
      }
      for (let i = 1; i < currentDay + 1; i++) {
        newDateArray.push(this.headers[i]);
      }
      return newDateArray;
   /* } else {
      return this.headers;
    }*/
  }

  fillTableWithDates(interval) {
    let from_time;
    let to_time;
    do {
      from_time = this.datePipe.transform(this.defaultFromDate, 'HH:mm');
      this.defaultFromDate.setMinutes(this.defaultFromDate.getMinutes() + interval);
      to_time = this.datePipe.transform(this.defaultFromDate, 'HH:mm');
      this.rows.push({'': from_time + '-' + to_time, Monday: '-',
        Tuesday: '-',
        Wednesday: '-',
        Thursday: '-',
        Friday: '-',
        Saturday: '-',
        Sunday: '-', Date: 'date'});
    }
    while (this.defaultFromDate.getDay() === this.dayOfTheWeek);
  }

  getDeviceOutputInTimeInterval(fromDate, toDate, timeIntervalInMinutes) {
    this.deviceOutputService.getDeviceOutputByTimestampAndId(1, {from_date: fromDate, to_date: toDate, interval: timeIntervalInMinutes}).subscribe(deviceOutput => {
      console.log(deviceOutput);
      for (let key in deviceOutput) {
        let numberOfPeople = 0;
        if (deviceOutput[key].length === 0) {
          let date = new Date(key);

          if (this.dayOfTheWeek !== date.getDay() && this.orderNumber !== 0) {
            this.orderNumber = 0;
            this.dayOfTheWeek = date.getDay();
          } else {
            this.orderNumber++;
          }
        } else {
          deviceOutput[key].forEach(thin => {
            numberOfPeople += thin.number_of_people;
          });
          numberOfPeople = (numberOfPeople / deviceOutput[key].length);
          this.orderNumber++;
          this.sortNumberOfPeopleByDayOfTheWeek(key, numberOfPeople.toFixed(2));
        }
      }
    });
  }

  sortNumberOfPeopleByDayOfTheWeek(dateOfPicture, numberOfPeople) {
    let date = new Date(dateOfPicture);
    let dayOftheWeek = date.getDay();

    if (this.dayOfTheWeek !== dayOftheWeek && this.orderNumber !== 0) {
      this.orderNumber = 0;
      this.dayOfTheWeek = dayOftheWeek;
    }
    this.rows[this.orderNumber].Date = date;

    switch (dayOftheWeek) {
      case 0:
        this.rows[this.orderNumber].Sunday = numberOfPeople;
        break;
      case 1:
        this.rows[this.orderNumber].Monday = numberOfPeople;
        break;
      case 2:
        this.rows[this.orderNumber].Tuesday = numberOfPeople;
        break;
      case 3:
        this.rows[this.orderNumber].Wednesday = numberOfPeople;
        break;
      case 4:
        this.rows[this.orderNumber].Thursday = numberOfPeople;
        break;
      case 5:
        this.rows[this.orderNumber].Friday = numberOfPeople;
        break;
      case 6:
        this.rows[this.orderNumber].Saturday = numberOfPeople;
        break;
    }
  }

  getDeviceOutputForValue(row, timeInterval, col) {
    let thing = new Date(row.Date);
    console.log('ROW');
    console.log(this.rows.indexOf(row));
    let dayOfTheWeek = this.getDayOfTheWeekAsNumber(col);
    this.changeTimeForFromDate();
    let dateWithoutTime = this.getDateBasedOnDayOfTheWeek(dayOfTheWeek, this.defaultFromDate);
    dateWithoutTime.setHours(thing.getHours());
    dateWithoutTime.setMinutes(thing.getMinutes());

    let fromDate = new Date(dateWithoutTime.setMinutes(dateWithoutTime.getMinutes() + timeInterval));
    let toDate = new Date(dateWithoutTime.setMinutes(dateWithoutTime.getMinutes() + timeInterval));
    this.deviceOutputService.getDeviceOutputByTimestampAndId(1, {from_date: fromDate, to_date: toDate.toISOString(), interval: timeInterval}).subscribe(deviceOutput => {
      this.dialog.open(DeviceOutputTableDetailsComponent, {
        data: deviceOutput
      });
    });
  }

  getDayOfTheWeekAsNumber(dayOfTheWeek): number {
    switch (dayOfTheWeek) {
      case 'Monday':
        return 1;
      case 'Tuesday':
        return 2;
      case 'Wednesday':
        return 3;
      case 'Thursday':
        return 4;
      case 'Friday':
        return 5;
      case 'Saturday':
        return 6;
      case 'Sunday':
        return 0;
    }
    return -1;
  }

  getDateBasedOnDayOfTheWeek(dayOfTheWeek, fromDate) {
    while (fromDate.getDay() !== dayOfTheWeek) {
      fromDate = new Date(fromDate.setDate(fromDate.getDate() + 1));
    }
    return fromDate;
  }
}
