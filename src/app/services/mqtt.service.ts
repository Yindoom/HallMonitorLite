import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConnectionService} from './connection.service';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

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

  //command line access to all devices who are subscribing to commandtopic on the backend
  blankCommandlineInput(deviceIds: number[], c: string): Observable<any> {
    const json = JSON.stringify({device_ids: deviceIds, command: c});
    console.log(json);
    return this.httpClient.put<any>(
      this.apiUrl + '/blankcommandlineinput',
      json,
      this.authService.getHttpOptions()
    );
  }

  // Tells the raspberry pie when it should be active (eg. from 9-5)
  updateHoursToRunBetween(deviceIds: number[], fromHour: number, toHour: number): Observable<any> {
    const json = JSON.stringify({device_ids: deviceIds, hour_to_start_at: fromHour, hour_to_stop_at: toHour});
    console.log(json);
    return this.httpClient.put<any>(
      this.apiUrl + '/updatehourstorunbetween',
      json,
      this.authService.getHttpOptions()
    );
  }

  // Tells the raspberry pie how often it should take a picture and count the people on it.
  updateMinutesToRunAt(deviceIds: number[], runTimes: number[]): Observable<any> {
    const json = JSON.stringify({device_ids: deviceIds, minutes_to_run_at: runTimes});
    console.log(runTimes);
    return this.httpClient.put<any>(
      this.apiUrl + '/updateminutestorunat',
      json,
      this.authService.getHttpOptions()
    );
  }
}
