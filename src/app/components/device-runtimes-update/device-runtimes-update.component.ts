import {Component, OnInit} from '@angular/core';
import {SharingService} from 'src/app/services/sharing.service';
import {MqttService} from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-device-runtimes-update',
  templateUrl: './device-runtimes-update.component.html',
  styleUrls: ['./device-runtimes-update.component.scss']
})
export class DeviceRuntimesUpdateComponent implements OnInit {
  private deviceIds = this.sharingService.fetch();
  runTimes = [];

  constructor(
    private sharingService: SharingService,
    private mqttService: MqttService
  ) {
  }

  ngOnInit() {
  }

  addRuntime(runTime: number) {
    if (runTime) {
      const index: number = this.runTimes.indexOf(runTime);
      if (index !== -1) {
        console.log('Runtime already exists');
      } else {
        this.runTimes.push(runTime);
      }
    }
  }

  deviceUpdateRuntime() {
    if (this.runTimes.length > 0) {
      this.mqttService
        .updateMinutesToRunAt(this.deviceIds, this.runTimes)
        .subscribe();
    }
  }
}
