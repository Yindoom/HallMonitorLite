import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private apiUrl: string;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private connectionService: ConnectionService
  ) {
    this.apiUrl = this.connectionService.getConnectionUrl() + 'mqtt';
  }

  blankCommandlineInput(deviceIds: number[], c: string): Observable<any> {
    const json = JSON.stringify({ device_ids: deviceIds, command: c});
    console.log(json);
    return this.httpClient.put<any>(
      this.apiUrl + '/blankcommandlineinput',
      json,
      this.authService.getHttpOptions()
    );
  }

  updateHoursToRunBetween(deviceIds: number[], fromHour: number, toHour: number): Observable<any> {
    const json = JSON.stringify({ device_ids: deviceIds, hour_to_start_at: fromHour, hour_to_stop_at: toHour});
    console.log(json);
    return this.httpClient.put<any>(
      this.apiUrl + '/updatehourstorunbetween',
      json,
      this.authService.getHttpOptions()
    );
  }

  updateMinutesToRunAt(deviceIds: number[], runTimes: number[]): Observable<any> {
    const json = JSON.stringify({ device_ids: deviceIds, minutes_to_run_at: runTimes});
    console.log(runTimes);
    return this.httpClient.put<any>(
      this.apiUrl + '/updateminutestorunat',
      json,
      this.authService.getHttpOptions()
    );
  }
}
