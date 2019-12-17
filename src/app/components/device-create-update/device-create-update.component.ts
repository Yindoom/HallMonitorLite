import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {DeviceState} from '../../ngxs/device.state';
import {Device} from '../../models/device.model';
import {AddDevice, UpdateDevice} from '../../ngxs/device.actions';

@Component({
  selector: 'app-device-create-update',
  templateUrl: './device-create-update.component.html',
  styleUrls: ['./device-create-update.component.scss']
})
export class DeviceCreateUpdateComponent implements OnInit {

  deviceForm = new FormGroup({
    comment: new FormControl('')
  });

  device: Device;
  edit: boolean;
  btnMessage = 'Create';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeviceCreateUpdateComponent>,
              private store: Store,
              private snackbar: MatSnackBar) {
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
      comment: device.comment
    });
  }

  deviceUpdateCreate() {
    const d: Device = this.deviceForm.value;
    if (this.edit) {
      this.store.dispatch(new UpdateDevice(this.device.id, d)).subscribe(() => {
        this.dialogRef.close();
        this.snackbar.open('You just updated ' + d.comment, 'Ok', {duration: 3000});
      });
    } else {
      this.store.dispatch(new AddDevice(d)).subscribe(() => {
        this.dialogRef.close();
        this.snackbar.open('You just added ' + d.comment, 'Ok', {duration: 3000});
      });
    }
  }
}
