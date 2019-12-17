import {Injectable, NgZone} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {PasswordComponent} from '../components/password/password.component';

@Injectable()
export class H401Interceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          if (err.error.msg === 'Token has expired') {
            this.authService.refresh().subscribe(token => {
              localStorage.setItem('access-token', token.access_token);
              request = this.addToken(request);
              return next.handle(request);
            });
          } else if (err.error.msg === 'Fresh token required') {
            const dialogRef = this.ngZone.run(() => {
              return this.dialog.open(PasswordComponent);
            });
            dialogRef.afterClosed().subscribe(() => {
              const req = this.addToken(request);
              return next.handle(req);
            });
          } else {
            console.log(err.error.msg);
          }
          const error = err.error.message || err.statusText;
          return throwError(error);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    });
  }
}
