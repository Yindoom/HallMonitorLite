import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../../ngxs/user.state';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {DeviceOutputState} from '../../ngxs/device-output.state';
import {UpdateUser} from '../../ngxs/user.actions';
import {UpdateDeviceOutput} from '../../ngxs/device-output.actions';

@Component({
  selector: 'app-device-output-table-details',
  templateUrl: './device-output-table-details.component.html',
  styleUrls: ['./device-output-table-details.component.scss']
})
export class DeviceOutputTableDetailsComponent implements OnInit {

  deviceOutputForm = new FormGroup({});
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeviceOutputTableDetailsComponent>,
              private store: Store) { }

  ngOnInit() {
    for (let key in this.data) {
      this.data = this.data[key];
    }
    console.log(this.data);
    this.fillFormControls(this.data);
  }
  fillFormControls(listOfDevices) {
    listOfDevices.forEach(device => {
      console.log(device);
      this.deviceOutputForm.addControl(device.id, new FormControl(''));
    });
  }

  updateDeviceOutput() {
    for (let deviceId in this.deviceOutputForm.value) {
      let deviceOutput = this.data.filter(x => x.id === Number(deviceId));
      if (Number(this.deviceOutputForm.value[deviceId]) !== deviceOutput[0].number_of_people && this.deviceOutputForm.value[deviceId] !== '') {
        deviceOutput[0].number_of_people = Number(this.deviceOutputForm.value[deviceId]);
        console.log(deviceOutput[0]);
        this.store.dispatch(new UpdateDeviceOutput(deviceOutput[0].id, deviceOutput[0])).subscribe(() => this.dialogRef.close());
      }
    }
  }
}
