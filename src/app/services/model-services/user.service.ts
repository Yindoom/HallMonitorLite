import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConnectionService} from '../connection.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl;
  constructor(private httpClient: HttpClient,
              private connectionService: ConnectionService,
              private authService: AuthService) {
    this.apiUrl = this.connectionService.getConnectionUrl() + 'user';
  }
  getUsers(): Observable<User[]> {
    const options = this.authService.getHttpOptions();
    return this.httpClient
      .get<User[]>(this.apiUrl, options);
  }

  getUserById(id: number): Observable<User> {
    const options = this.authService.getHttpOptions();
    return this.httpClient
      .get<User>(this.apiUrl + '?id=' + id, options);
  }

  createUser(user: User) {
    const options = this.authService.getHttpOptions();
    return this.httpClient
      .post<User>(this.apiUrl, JSON.stringify(user), options);
  }

  updateUser(id, user: User) {
    const options = this.authService.getHttpOptions();
    return this.httpClient
      .put<User>(this.apiUrl + '?id=' + id, JSON.stringify(user), options);
  }

  deleteUser(id: number) {
    const options = this.authService.getHttpOptions();
    return this.httpClient
      .delete<User>(this.apiUrl + '?id=' + id, options);
  }
}
