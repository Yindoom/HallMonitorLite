import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class H401Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        debugger;
        if (err.status === 401) {
            console.log(err.error.msg)
          if (err.error.msg === 'Token has expired') {
            console.log(this.authService.getToken());
            this.authService.refresh().subscribe(token => {
              localStorage.setItem('access-token', token.access_token);
              request = this.addToken(request);
              return next.handle(request);
            });
          }
        } else {
          console.log(err.error.msg);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    const t = req.clone();
    debugger;
    const p = req.clone({
      body: null,
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    });
    return p;
  }
}
