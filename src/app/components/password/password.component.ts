import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

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
