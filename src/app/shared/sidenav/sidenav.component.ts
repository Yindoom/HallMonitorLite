import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from 'src/app/shared/sidenav/sidenav.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;

  constructor(private service: SidenavService, private router: Router) { }

  ngOnInit() {
    debugger;
    this.service.setSidenav(this.sidenav);
  }

  logout() {
    localStorage.removeItem('token');
    this.service.toggleNav();
    this.router.navigate(['/login']);
  }

}
