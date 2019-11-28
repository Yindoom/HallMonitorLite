import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  canActivate() {
    return this.authService.isAdmin();
  }

  constructor(private authService: AuthService) { }
  
}
