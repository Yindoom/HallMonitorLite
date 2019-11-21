import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserCreateUpdateComponent} from '../user-create-update/user-create-update.component';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {DeviceState} from '../../ngxs/device.state';
import {Device} from '../../models/device.model';
import {AddDevice, GetDevices, UpdateDevice} from '../../ngxs/device.actions';

@Component({
  selector: 'app-device-create-update',
  templateUrl: './device-create-update.component.html',
  styleUrls: ['./device-create-update.component.scss']
})
export class DeviceCreateUpdateComponent implements OnInit {

  deviceForm = new FormGroup({
    comment: new FormControl(''),
    admin_id: new FormControl('')
  });

  device: Device;
  edit: boolean;
  btnMessage: String = 'Create';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
              private store: Store) {
  }

  @Select(DeviceState.getDeviceById) editDevice: Observable<Device>;

  ngOnInit() {
    this.edit = this.data.edit;

    if (this.edit) {
      this.btnMessage = 'Update';
      this.editDevice.subscribe(device => {
        this.device = device;
        this.patchValues(this.device);
      });
    }
  }

  patchValues(device: Device) {
    this.deviceForm.patchValue({
      comment: device.comment,
      admin_id: device.admin_id
    });
  }

  deviceUpdateCreate() {
    const d: Device = this.deviceForm.value;
    if (this.edit) {
      this.store.dispatch(new UpdateDevice(this.device.id, d)).subscribe(() => this.dialogRef.close());
    } else {
      this.store.dispatch(new AddDevice(d)).subscribe(() => this.dialogRef.close());
    }
  }
}
