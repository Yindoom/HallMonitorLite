import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';
import { MqttService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-device-commandline',
  templateUrl: './device-commandline.component.html',
  styleUrls: ['./device-commandline.component.scss']
})
export class DeviceCommandlineComponent implements OnInit {
  private deviceIds = this.sharingService.fetch();

  constructor(
    private sharingService: SharingService,
    private mqttService: MqttService
  ) {}

  ngOnInit() {
  }

  commandline(command: string) {
    if (command) {
      this.mqttService
        .blankCommandlineInput(this.deviceIds, command)
        .subscribe();
    }
  }
}
