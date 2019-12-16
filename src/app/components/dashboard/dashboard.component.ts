import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {Device} from 'src/app/models/device.model';
import {Select, Store} from '@ngxs/store';
import {DeviceOutputState} from '../../ngxs/device-output.state';
import {DeviceOutput} from '../../models/deviceOutput.model';
import {GetDeviceOutputs} from '../../ngxs/device-output.actions';
import {DeviceState} from '../../ngxs/device.state';
import {GetById, GetDevices} from '../../ngxs/device.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(DeviceState.getDevices) deviceList: Observable<Device[]>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new GetDevices());
  }

  clickOnDevice(deviceId) {
    this.store.dispatch(new GetById(deviceId)).subscribe(() => {
      this.router.navigateByUrl('/table');
    });
  }
}
