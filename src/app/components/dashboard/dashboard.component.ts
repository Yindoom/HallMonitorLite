import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/shared/sidenav/sidenav.service';
import { DeviceOutputService } from 'src/app/services/model-services/device-output.service';
import { DeviceService } from 'src/app/services/model-services/device.service';
import { MatSnackBar, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { Observable } from 'rxjs';
import { Device } from 'src/app/shared/models/device.model';
import { DeviceOutput } from 'src/app/shared/models/deviceOutput.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  devices: Observable<Device[]>;

  public barChartLabels = [];
  public barChartData = [{ data: [], label: 'nr Of People' }];
  public barChartType = 'bar';
  public barChartLegend = true;

  constructor(
    private navService: SidenavService,
    private deviceOutputService: DeviceOutputService,
    private deviceService: DeviceService,
    private snackBar: MatSnackBar
  ) {}

  public deviceOutputs: DeviceOutput[];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  ngOnInit() {
    this.devices = this.deviceService.getDevices();
    this.showData();
  }

  showData() {
    const dataArr = [];
    this.barChartLabels = [];
    this.deviceOutputService.getDeviceOutputs().subscribe(values => {
      this.deviceOutputs = values;
      values.forEach(output => {
        this.barChartLabels.push(output.timestamp);
        dataArr.push(output.number_of_people);
      });
    });
    this.barChartData = [{ data: dataArr, label: 'nr Of People' }];
  }
}
