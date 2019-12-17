import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm = new FormGroup({
    password: new FormControl('')
  });

  constructor(
    private dialogRef: MatDialogRef<PasswordComponent>,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  // login again if tokens are not fresh enough
  loginAndSetTokens() {

    const login = this.passwordForm.value;
    login.username = this.authService.getUsername();

    this.authService.login(login).subscribe(token => {
      localStorage.setItem('access-token', token.access_token);
      localStorage.setItem('refresh-token', token.refresh_token);
      this.dialogRef.close();
    });
  }
}
