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

    //shows the navbar when you refresh page
    if (this.authService.getLoggedInUserId() != '') {
      console.log(this.authService.getLoggedInUserId());
      this.isLoggedIn = true;
      this.init();
    }

    //shows the navbar when you have logged in
    this.subscription = this.authService.checkAccessToken().subscribe(x => {
      if (x !== false) {
        this.isLoggedIn = x;
        console.log(x + ' x is');
        this.init();
      }
    });
  }

  init() {
    console.log('is logged in in init + ' + this.isLoggedIn + 'authservice Islogged ' + this.authService.isLogged);
    if (this.isLoggedIn && this.authService.checkAccessToken()) {
      console.log(this.authService.checkAccessToken());
      this.isAdminLoggedIn = this.authService.isAdmin();
      this.isLoggedIn = true;
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

