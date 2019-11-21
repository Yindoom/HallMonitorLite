import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConnectionService} from '../connection.service';
import {Device} from '../../models/device.model';
import {Observable} from 'rxjs';
import {DeviceOutput} from '../../models/deviceOutput.model';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl;
  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private connectionService: ConnectionService) {
    this.apiUrl = this.connectionService.getConnectionUrl() + 'device'; }

  getDevices(): Observable<Device[]> {
    return this.httpClient
      .get<Device[]>(this.apiUrl);
  }

  getDeviceById(id: number): Observable<Device> {
    return this.httpClient
      .get<Device>(this.apiUrl + '?id=' + id);
  }

  createDevice(device: Device) {
    return this.httpClient
      .post<Device>(this.apiUrl, device); //JSON.stringify(device)
  }

  updateDevice(id, device: Device) {
    return this.httpClient
      .put<Device>(this.apiUrl + '?id=' + id, device);
  }

  deleteDevice(id: number) {
    const options = this.authService.getHttpOptions();
    return this.httpClient
      .delete<Device>(this.apiUrl + '?id=' + id, options);
  }
}
