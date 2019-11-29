import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {LoginDTO} from '../models/loginDTO.model';
import decode from 'jwt-decode';
import {Router} from '@angular/router';
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

  apiUrl = this.connection.getConnectionUrl();

  public loggedSubject: Subject<boolean>;
  public isLogged: any;

  constructor(
    private connection: ConnectionService,
    private http: HttpClient,
    private router: Router
  ) {
    this.loggedSubject = new Subject<boolean>();
    this.isLogged = this.loggedSubject.asObservable();
    this.loggedSubject.next(false);
  }

  checkAccessToken() {
    return this.isLogged;
  }

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
    console.log(token + ' token');
    const decoded = decode(token);
    const role = decoded.user_claims['role'];
    const isAdmin = role === 'Admin' || role === 'SuperAdmin';
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
    return decoded.user_claims['id'];
  }

  getUsername() {
    const token = localStorage.getItem('access-token');
    const decoded = decode(token);
    const user = decoded.identity;
    
    return user;
  }
  logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    this.loggedSubject.next(false);
    this.router.navigate(['/login']);
  }


}
