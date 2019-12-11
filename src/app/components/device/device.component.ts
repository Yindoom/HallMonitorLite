import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {DeviceState} from '../../ngxs/device.state';
import {Device} from '../../models/device.model';
import {Store, Select} from '@ngxs/store';
import {GetById, GetDevices, RemoveDevice} from '../../ngxs/device.actions';
import {MatDialog} from '@angular/material';
import {DeviceCreateUpdateComponent} from '../device-create-update/device-create-update.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Select(DeviceState.getDevices) deviceList: Observable<Device[]>;

  constructor(private store: Store,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(new GetDevices());
  }

  deleteDevice(id: number) {
    this.store.dispatch(new RemoveDevice(id));
  }

  updateDevice(id: number) {
    this.store.dispatch(new GetById(id)).subscribe(() => {
      this.dialog.open(DeviceCreateUpdateComponent, {
        data: {edit: true}
      });
    });
  }

  createDevice() {
    this.dialog.open(DeviceCreateUpdateComponent, {
      data: {edit: false}
    });
  }
}
