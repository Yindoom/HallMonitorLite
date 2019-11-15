import { Injectable } from '@angular/core';
// @ts-ignore
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  sideNav: MatSidenav;
  constructor() { }

  setSidenav(sidenav: MatSidenav) {
    this.sideNav = sidenav;
  }

  toggleNav() {
    this.sideNav.toggle();
  }
}
