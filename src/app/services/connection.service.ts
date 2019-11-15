import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private apiUrl = 'http://165.22.65.134:5000/';
  constructor() {}

  getConnectionUrl() {
    return this.apiUrl;
  }
}
