import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {DeviceState} from '../../ngxs/device.state';
import {Device} from '../../models/device.model';
import {Store, Select} from '@ngxs/store';
import {GetById, GetDevices, RemoveDevice} from '../../ngxs/device.actions';
import {MatDialog} from '@angular/material';
import {DeviceCreateUpdateComponent} from '../device-create-update/device-create-update.component';
import {DeviceRuntimesUpdateComponent} from '../device-runtimes-update/device-runtimes-update.component';
import { from } from 'rxjs';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  deviceIds = [];
  @Select(DeviceState.getDevices) deviceList: Observable<Device[]>;

  constructor(private store: Store,
              private dialog: MatDialog,
              private sharingService: SharingService) {
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

  addDeviceId(id: number) {
    if (id) {
      const index: number = this.deviceIds.indexOf(id);
      if (index !== -1) {
        this.deviceIds.splice(index, 1);
      } else {
        this.deviceIds.push(id);
      }
    }
    this.sharingService.save(this.deviceIds);
  }

  updateDeviceRuntimes(id: number) {
    this.dialog.open(DeviceRuntimesUpdateComponent);
  }

  createDevice() {
    this.dialog.open(DeviceCreateUpdateComponent, {
      data: {edit: false}
    });
  }
}
