import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConnectionService} from '../connection.service';
import {Device} from '../../shared/models/device.model';
import {Observable} from 'rxjs';
import {DeviceOutput} from '../../shared/models/deviceOutput.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl;
  constructor(private httpClient: HttpClient,
              private connectionService: ConnectionService) {
    this.apiUrl = this.connectionService.getConnectionUrl() + 'device'; }

  getDevices(): Observable<Device[]> {
    return this.httpClient
      .get<Device[]>(this.apiUrl);
  }

  getDeviceById(id: string): Observable<Device> {
    return this.httpClient
      .get<Device>(this.apiUrl + '?id=' + id);
  }

  createDevice(device: Device) {
    return this.httpClient
      .post<Device>(this.apiUrl, JSON.stringify(device));
  }

  updateDevice(device: Device) {
    return this.httpClient
      .put<Device>(this.apiUrl + '?id=' + device.id, JSON.stringify(device));
  }

  deleteDevice(device: Device) {
    return this.httpClient
      .delete<Device>(this.apiUrl + '?id=' + device.id);
  }
}
