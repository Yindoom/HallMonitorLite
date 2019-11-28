import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginDTO} from '../models/loginDTO.model';
import decode from 'jwt-decode';
import { isThisTypeNode } from 'typescript';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private connection: ConnectionService,
    private http: HttpClient
  ) {}

  apiUrl = this.connection.getConnectionUrl();

  login(dto: LoginDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', dto);
  }

  getToken() {
    return localStorage.getItem('access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh-token');
  }

  refresh() {
    localStorage.removeItem('access-token');
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      'Bearer ' + this.getRefreshToken()
    );
    return this.http.get<any>(this.apiUrl + 'refresh', httpOptions);
  }

  isAdmin() {
    console.log("Is Admin")
    const token = localStorage.getItem('access-token');
    const decoded = decode(token);
    const role = decoded.user_claims['role'];
    const isAdmin = role === 'Admin';
    return isAdmin;
  }

  getHttpOptions() {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      'Bearer ' + this.getToken()
    );
    return httpOptions;
  }

  getLoggedInUserId() {
    const token = localStorage.getItem('access-token');
    const decoded = decode(token);
    console.log(decoded.user_claims['id']);
    return decoded.user_claims['id'];
  }

  getUsername() {
    const token = localStorage.getItem('access-token');
    const decoded = decode(token);
    const user = decoded.identity;
    
    return user;
  }
}
