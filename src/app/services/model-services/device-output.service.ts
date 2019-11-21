import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConnectionService} from '../connection.service';
import {DeviceOutput} from '../../models/deviceOutput.model';
import {Observable} from 'rxjs';
import {DateInterval} from '../../models/dateInterval.model';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceOutputService {
  private apiUrl;
  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private connectionService: ConnectionService) {
    this.apiUrl = this.connectionService.getConnectionUrl() + 'deviceoutput';
  }

  getDeviceOutputs(): Observable<DeviceOutput[]> {
    return this.httpClient
      .get<DeviceOutput[]>(this.apiUrl);
  }

  getDeviceOutputById(id: number): Observable<DeviceOutput> {
    return this.httpClient
      .get<DeviceOutput>(this.apiUrl + '?id=' + id);
  }

  getDeviceOutputByTimeInterval(dates: DateInterval): Observable<DeviceOutput[]> {
    return this.httpClient
      .post<DeviceOutput[]>(this.apiUrl + '/getbydate', dates);
  }

  addDeviceOutput(output: DeviceOutput) {
    return this.httpClient
      .post<DeviceOutput>(this.apiUrl, output);
  }

  updateDeviceOutput(id, output: DeviceOutput) {
    return this.httpClient
      .put<DeviceOutput>(this.apiUrl + '?id=' + id, output);
  }

  removeDeviceOutput(id: number) {
    const options = this.authService.getHttpOptions();
    return this.httpClient
      .delete<DeviceOutput>(this.apiUrl + '?id=' + id, options);
  }
}
