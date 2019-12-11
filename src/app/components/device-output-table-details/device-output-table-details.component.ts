import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Select, Store} from '@ngxs/store';
import {AddDeviceOutput, UpdateDeviceOutput} from '../../ngxs/device-output.actions';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {DeviceOutput} from '../../models/deviceOutput.model';

@Component({
  selector: 'app-device-output-table-details',
  templateUrl: './device-output-table-details.component.html',
  styleUrls: ['./device-output-table-details.component.scss']
})
export class DeviceOutputTableDetailsComponent implements OnInit {

  deviceOutputForm = new FormGroup({});
  dateOfSelectedOutput;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeviceOutputTableDetailsComponent>,
              private store: Store) { }

  ngOnInit() {
    for (let key in this.data) {
      this.data = this.data[key];
      console.log(key);
      this.dateOfSelectedOutput = moment.utc(key).add(15, 'seconds').format('YYYY-MM-DD HH:mm:ss');
    }
    if (this.data.length === 0 ) {
      this.deviceOutputForm.addControl('number_of_people', new FormControl(''));
    } else {
      this.fillFormControls(this.data);
    }
  }

  fillFormControls(listOfDevices) {
    listOfDevices.forEach(device => {
      this.deviceOutputForm.addControl(device.id, new FormControl(''));
    });
  }

  updateDeviceOutput() {
    for (let deviceId in this.deviceOutputForm.value) {
      console.log('VALUE: ' + this.deviceOutputForm.value);
      let deviceOutput = this.data.filter(x => x.id === Number(deviceId));
      if (Number(this.deviceOutputForm.value[deviceId]) !== deviceOutput[0].number_of_people && this.deviceOutputForm.value[deviceId] !== '') {
        deviceOutput[0].number_of_people = Number(this.deviceOutputForm.value[deviceId]);
        deviceOutput[0].timestamp = moment.utc(deviceOutput[0].timestamp).format('YYYY-MM-DD HH:mm:ss');
        this.store.dispatch(new UpdateDeviceOutput(deviceOutput[0].id, {device_id: 1, number_of_people: deviceOutput[0].number_of_people, timestamp: deviceOutput[0].timestamp})).subscribe();
      }
      let averagePeople = (this.data.reduce((a, b) => a + (b.number_of_people), 0) / this.data.length);
      this.dialogRef.close({numberOfPeople: averagePeople});
    }
  }

  addDeviceOutput() {
    const o: DeviceOutput = this.deviceOutputForm.value;
    if (o.number_of_people > 0) {
      this.store.dispatch(new AddDeviceOutput({device_id: 1, number_of_people: o.number_of_people , timestamp: this.dateOfSelectedOutput})).subscribe(() => this.dialogRef.close({numberOfPeople: Number(o.number_of_people)}));
    }
  }
}
