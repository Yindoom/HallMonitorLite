import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConnectionService} from '../connection.service';
import {DeviceOutput} from '../../models/deviceOutput.model';
import {Observable} from 'rxjs';
import {DateInterval} from '../../models/dateInterval.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceOutputService {
  private apiUrl;
  constructor(private httpClient: HttpClient,
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

  createDeviceOutput(output: DeviceOutput) {
    return this.httpClient
      .post<DeviceOutput>(this.apiUrl, JSON.stringify(output));
  }

  updateDeviceOutput(output: DeviceOutput) {
    return this.httpClient
      .put<DeviceOutput>(this.apiUrl + '?id=' + output.id, output);
  }

  deleteDeviceOutput(output: DeviceOutput) {
    return this.httpClient
      .delete<DeviceOutput>(this.apiUrl + '?id=' + output.id);
  }
}
