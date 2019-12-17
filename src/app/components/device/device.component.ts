import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DeviceState} from '../../ngxs/device.state';
import {Device} from '../../models/device.model';
import {Store, Select} from '@ngxs/store';
import {GetById, GetDevices, RemoveDevice} from '../../ngxs/device.actions';
import {MatDialog} from '@angular/material';
import {DeviceCreateUpdateComponent} from '../device-create-update/device-create-update.component';
import {DeviceRuntimesUpdateComponent} from '../device-runtimes-update/device-runtimes-update.component';
import {SharingService} from 'src/app/services/sharing.service';
import {DeviceHoursToRunBetweenUpdateComponent} from '../device-hours-to-run-between-update/device-hours-to-run-between-update.component';
import {DeviceCommandlineComponent} from '../device-commandline/device-commandline.component';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  isSuperAdminLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  deviceIds = [];
  @Select(DeviceState.getDevices) deviceList: Observable<Device[]>;

  constructor(private store: Store,
              private dialog: MatDialog,
              private sharingService: SharingService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.store.dispatch(new GetDevices());

    if (this.authService.checkAccessToken()) {
      this.isAdminLoggedIn = this.authService.isAdmin();
    }

    if (this.authService.checkAccessToken()) {
      this.isSuperAdminLoggedIn = this.authService.isSuperAdmin();
    }
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

  updateDeviceRuntimes() {
    if (this.deviceIds.length > 0) {
      this.dialog.open(DeviceRuntimesUpdateComponent);
    }
  }

  updateDeviceRunHours() {
    if (this.deviceIds.length > 0) {
      this.dialog.open(DeviceHoursToRunBetweenUpdateComponent);
    }
  }

  deviceCommandline() {
    this.dialog.open(DeviceCommandlineComponent);
  }

  createDevice() {
    this.dialog.open(DeviceCreateUpdateComponent, {
      data: {edit: false}
    });
  }
}
