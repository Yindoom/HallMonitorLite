import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DeviceState} from '../../ngxs/device.state';
import {Device} from '../../models/device.model';
import {Store, Select} from '@ngxs/store'

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Select(DeviceState.getDevices) deviceList: Observable<Device[]>;
  constructor() { }

  ngOnInit() {
  }
}
