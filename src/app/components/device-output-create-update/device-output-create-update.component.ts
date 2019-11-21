import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DeviceOutputState} from '../../ngxs/device-output.state';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Select, Store} from '@ngxs/store';
import {DeviceOutput} from '../../models/deviceOutput.model';
import {Device} from '../../models/device.model';
import {AddDeviceOutput, GetDeviceOutputs, UpdateDeviceOutput} from '../../ngxs/device-output.actions';

@Component({
  selector: 'app-device-output-create-update',
  templateUrl: './device-output-create-update.component.html',
  styleUrls: ['./device-output-create-update.component.scss']
})
export class DeviceOutputCreateUpdateComponent implements OnInit {

  deviceOutputForm = new FormGroup({
    device_id: new FormControl(''),
    number_of_people: new FormControl(''),
    timestamp: new FormControl('')
  });

  deviceOutput: DeviceOutput;
  edit: boolean;
  btnMessage: String = 'Create';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeviceOutputCreateUpdateComponent>,
              private store: Store) {
  }

  @Select(DeviceOutputState.getDeviceOutputById) editDeviceOutput: Observable<DeviceOutput>;

  ngOnInit() {
    this.edit = this.data.edit;

    if (this.edit) {
      this.btnMessage = 'Update';
      this.editDeviceOutput.subscribe(output => {
        this.deviceOutput = output;
        this.patchValues(this.deviceOutput);
      });
    }
  }

  patchValues(deviceOutput: DeviceOutput) {
    this.deviceOutputForm.patchValue({
      device_id: deviceOutput.device_id,
      number_of_people: deviceOutput.number_of_people,
      timestamp: deviceOutput.timestamp
    });
  }

  deviceOutputUpdateCreate() {
    const o: DeviceOutput = this.deviceOutputForm.value;
    if (this.edit) {
      this.store.dispatch(new UpdateDeviceOutput(this.deviceOutput.id, o)).subscribe(() => this.dialogRef.close());
    } else {
      this.store.dispatch(new AddDeviceOutput(o)).subscribe(() => this.dialogRef.close());
    }
  }

}
