import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  passwordForm = new FormGroup({
    password: new FormControl('')
  });

  constructor() {
  }

  ngOnInit() {
  }

  // login again
  doSomethingWithLogin() {
    console.log('hi');
  }

}
