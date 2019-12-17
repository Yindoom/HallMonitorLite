import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Device} from 'src/app/models/device.model';
import {Select, Store} from '@ngxs/store';
import {DeviceState} from '../../ngxs/device.state';
import {GetById, GetDevices} from '../../ngxs/device.actions';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(DeviceState.getDevices) deviceList: Observable<Device[]>;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(new GetDevices());
  }

  clickOnDevice(deviceId) {
    this.store.dispatch(new GetById(deviceId)).subscribe(() => {
      this.router.navigateByUrl('/table');
    });
  }

  checkHeartbeatDate(heartbeatDate: any) {
    const currentUtcDate = moment.utc(new Date()).utc().subtract(2, 'm').format('YYYY-MM-DD HH:mm:ss');
    if (currentUtcDate < heartbeatDate) {
      return true;
    }
  }
}
