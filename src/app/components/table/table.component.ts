import { Component, OnInit } from '@angular/core';
import {DeviceOutputService} from '../../services/model-services/device-output.service';
import {MatDialog} from '@angular/material';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {DeviceOutputTableDetailsComponent} from '../device-output-table-details/device-output-table-details.component';
import {Select, Store} from '@ngxs/store';
import {DeviceState} from '../../ngxs/device.state';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  headers = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  rows = [];
  timeIntervalForm = new FormControl('');

  orderNumber = 0;
  defaultFromDate = moment().subtract(6, 'days').set({h: 0, m: 0, s: 0});
  defaultToDate = moment();
  timeInterval = 60;
  selectedDeviceId;

  @Select(DeviceState.getDeviceById) deviceId: Observable<any>;

  constructor(private deviceOutputService: DeviceOutputService, private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.deviceId.subscribe(value => {
      if (value === null) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.selectedDeviceId = value;
      }
    });
    this.updateTable(true);
  }

  updateTable(isUpdateDays) {
    this.orderNumber = 0;
    if (isUpdateDays === true) {
      this.getDaysForCurrentWeek();
    }
    this.fillTableWithDates(this.timeInterval);
    this.getDeviceOutputInTimeInterval(this.defaultFromDate, this.defaultToDate, this.timeInterval);
  }

  updateTimeInterval() {
    if (this.timeIntervalForm.value !== '' && this.timeIntervalForm.value > 10) {
      this.timeInterval = this.timeIntervalForm.value;
      this.updateTable(false);
    }
}

  getDaysForCurrentWeek() {
    if (this.defaultToDate.isoWeek() === moment().isoWeek()) {
      const currentDay = this.defaultToDate.isoWeekday();
      const newDateArray = [''];
      for (let i = currentDay + 1; i < 8; i++) {
        newDateArray.push(this.headers[i]);
      }
      for (let i = 1; i < currentDay + 1; i++) {
        newDateArray.push(this.headers[i]);
      }
      this.headers = newDateArray;
    } else {
      this.headers = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    }
  }

  fillTableWithDates(interval) {
    this.rows = [];
    const date = moment(this.defaultFromDate);
    do {
      this.rows.push({Date: date.format('YYYY-MM-DD HH:mm:ss'),
        '': date.format('HH:mm') + '-' + date.add(interval, 'minutes').format('HH:mm'), Monday: '-',
        Tuesday: '-',
        Wednesday: '-',
        Thursday: '-',
        Friday: '-',
        Saturday: '-',
        Sunday: '-'});
    }
    while (date.isoWeekday() === this.defaultFromDate.isoWeekday());
  }

  getDeviceOutputInTimeInterval(fromDate, toDate, timeIntervalInMinutes) {
    this.deviceOutputService.getDeviceOutputByTimestampAndId(this.selectedDeviceId, {from_date: fromDate, to_date: toDate, interval: timeIntervalInMinutes})
      .subscribe(deviceOutput => {
      for (const key in deviceOutput) {
        let numberOfPeople = 0;
        if (deviceOutput[key].length === 0) {
          if (this.orderNumber === this.rows.length - 1) {
            this.orderNumber = 0;
          } else {
            this.orderNumber++;
          }
        } else {
          deviceOutput[key].forEach(thin => {
            numberOfPeople += thin.number_of_people;
          });
          numberOfPeople = (numberOfPeople / deviceOutput[key].length);
          this.sortNumberOfPeopleByDayOfTheWeek(key, numberOfPeople.toFixed(2));
          this.orderNumber++;
        }
      }
    });
  }

  sortNumberOfPeopleByDayOfTheWeek(dateOfPicture, numberOfPeople) {
    const dayOfTheWeek = moment.utc(dateOfPicture).local().isoWeekday();

    if (this.orderNumber === this.rows.length) {
      this.orderNumber = 0;
    }
    this.updateValueInRow(dayOfTheWeek, this.orderNumber, numberOfPeople);
  }

  updateValueInRow(dayOfTheWeek, indexNumber, numberOfPeople) {
    switch (dayOfTheWeek) {
      case 1:
        this.rows[indexNumber].Monday = numberOfPeople;
        break;
      case 2:
        this.rows[indexNumber].Tuesday = numberOfPeople;
        break;
      case 3:
        this.rows[indexNumber].Wednesday = numberOfPeople;
        break;
      case 4:
        this.rows[indexNumber].Thursday = numberOfPeople;
        break;
      case 5:
        this.rows[indexNumber].Friday = numberOfPeople;
        break;
      case 6:
        this.rows[indexNumber].Saturday = numberOfPeople;
        break;
      case 7:
        this.rows[indexNumber].Sunday = numberOfPeople;
        break;
    }
  }

  getDeviceOutputForValue(row, col) {
    const localTimeOfOutput = moment(row.Date);

    const dayOfTheWeek = this.getDayOfTheWeekAsNumber(col);
    const dateWithoutTime = this.getDateBasedOnDayOfTheWeek(dayOfTheWeek, this.defaultFromDate);
    dateWithoutTime.set({h: localTimeOfOutput.hours(), m: localTimeOfOutput.minutes()});

    const fromDate = dateWithoutTime;
    const toDate = moment(dateWithoutTime).add(this.timeInterval, 'minutes');

    this.deviceOutputService.getDeviceOutputByTimestampAndId(this.selectedDeviceId, {from_date: fromDate, to_date: toDate, interval: this.timeInterval})
      .subscribe(deviceOutput => {
      this.dialog.open(DeviceOutputTableDetailsComponent, {
        data: deviceOutput,
      }).afterClosed().subscribe(response => {
        this.updateValueInRow(dayOfTheWeek, this.rows.indexOf(row), response.numberOfPeople.toFixed(2));
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
        return 7;
    }
    return -1;
  }

  getDateBasedOnDayOfTheWeek(dayOfTheWeek, fromDate) {
    let startDate = moment(fromDate);
    while (startDate.isoWeekday() !== dayOfTheWeek) {
      startDate = startDate.add(1, 'days');
    }
    return startDate;
  }

  changeWeekWithArrow(isFuture) {
    let newWeek;
    const numberOfCurrentWeek = moment().isoWeek();

    if (isFuture === true && numberOfCurrentWeek !== this.defaultToDate.isoWeek()) {
       newWeek = moment(this.defaultToDate).add(1, 'weeks');

       if (newWeek.isoWeek() === numberOfCurrentWeek) {
        this.defaultToDate = moment();
        this.defaultFromDate = moment().subtract(6, 'days').set({h: 0, m: 0, s: 0});
      } else {
         this.defaultFromDate = moment(newWeek.startOf('isoWeek'));
         this.defaultToDate = moment(newWeek.endOf('isoWeek'));
       }

       this.updateTable(true);

    } else if (isFuture === false) {
       newWeek = moment(this.defaultToDate).subtract(1, 'weeks');

       this.defaultFromDate = moment(newWeek.startOf('isoWeek'));
       this.defaultToDate = moment(newWeek.endOf('isoWeek'));

       this.updateTable(true);
    }
  }
}
