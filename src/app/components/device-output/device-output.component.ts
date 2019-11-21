import {Component, OnInit} from '@angular/core';
import {Store, Select} from '@ngxs/store';
import {MatDialog} from '@angular/material';
import {GetById, GetDeviceOutputs, RemoveDeviceOutput} from '../../ngxs/device-output.actions';
import {DeviceOutputCreateUpdateComponent} from '../device-output-create-update/device-output-create-update.component';
import {Observable} from 'rxjs';
import {DeviceOutputState} from '../../ngxs/device-output.state';
import {DeviceOutput} from '../../models/deviceOutput.model';
import {UserState} from '../../ngxs/user.state';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-device-output',
  templateUrl: './device-output.component.html',
  styleUrls: ['./device-output.component.scss']
})
export class DeviceOutputComponent implements OnInit {

  @Select(DeviceOutputState.getDeviceOutputs) deviceOutputList: Observable<DeviceOutput[]>;

  constructor(private store: Store,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(new GetDeviceOutputs());
  }

  deleteDeviceOutput(id: number) {
    this.store.dispatch(new RemoveDeviceOutput(id));
  }

  updateDeviceOutput(id: number) {
    this.store.dispatch(new GetById(id)).subscribe(() => {
      this.dialog.open(DeviceOutputCreateUpdateComponent, {
        data: {edit: true}
      });
    });
  }

  createDeviceOutput() {
    this.dialog.open(DeviceOutputCreateUpdateComponent, {
      data: {edit: false}
    });
  }
}
