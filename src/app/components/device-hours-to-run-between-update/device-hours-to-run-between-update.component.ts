import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';
import { MqttService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-device-hours-to-run-between-update',
  templateUrl: './device-hours-to-run-between-update.component.html',
  styleUrls: ['./device-hours-to-run-between-update.component.scss']
})
export class DeviceHoursToRunBetweenUpdateComponent implements OnInit {
  private deviceIds = this.sharingService.fetch();

  constructor(
    private sharingService: SharingService,
    private mqttService: MqttService
  ) {}

  ngOnInit() {
  }

  updateHoursToRunBetween(fromHour: number, toHour: number) {
    if (fromHour && toHour) {
      this.mqttService
      .updateHoursToRunBetween(this.deviceIds, fromHour, toHour)
      .subscribe();
    }
  }
}
