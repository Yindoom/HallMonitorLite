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
    return this.httpClient.get<DeviceOutput[]>(
      this.apiUrl,
      this.authService.getHttpOptions()
    );
  }

  getDeviceOutputById(id: number): Observable<DeviceOutput> {
    return this.httpClient.get<DeviceOutput>(
      this.apiUrl + "?id=" + id,
      this.authService.getHttpOptions()
    );
  }

  getDeviceOutputByTimeInterval(dates: DateInterval): Observable<DeviceOutput[]> {
    return this.httpClient.post<DeviceOutput[]>(
      this.apiUrl + "/getbydate",
      dates,
      this.authService.getHttpOptions()
    );
  }

  addDeviceOutput(output: DeviceOutput) {
    return this.httpClient.post<DeviceOutput>(
      this.apiUrl,
      output,
      this.authService.getHttpOptions()
    );
  }

  updateDeviceOutput(id, output: DeviceOutput) {
    return this.httpClient.put<DeviceOutput>(
      this.apiUrl + "?id=" + id,
      output,
      this.authService.getHttpOptions()
    );
  }

  removeDeviceOutput(id: number) {
    
    return this.httpClient.delete<DeviceOutput>(
      this.apiUrl + "?id=" + id,
      this.authService.getHttpOptions()
    );
  }
}
