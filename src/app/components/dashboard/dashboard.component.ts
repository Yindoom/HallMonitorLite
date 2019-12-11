import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {Device} from 'src/app/models/device.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  devices: Observable<Device[]>;

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
  }


}
