import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AuthGuard} from '../../guards/auth.guard';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminGuard} from '../../guards/admin.guard';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;

  private subscription: any;

  constructor(private authService: AuthService,
              private authGuard: AuthGuard,
              private adminGuard: AdminGuard,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.init();
    this.subscription = this.authService.checkAccessToken().subscribe(x => {
      if (x !== false) {
        this.isLoggedIn = x;
        //this.isAdminLoggedIn = true;
        this.init();
      }
    });
  }

  init() {
    if (this.authService.checkAccessToken()) {
      this.isAdminLoggedIn = this.authService.isAdmin();
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    //this.logout();
  }

  logout() {
    this.isAdminLoggedIn = false;
    this.isLoggedIn = false;
    this.authService.logout();
  }

  checkIfLoggedIn() {
    return this.authGuard.canActivate();
  }

  checkIfAdminLoggedIn() {
    return this.adminGuard.canActivate();
  }
}

