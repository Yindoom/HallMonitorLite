import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/services/model-services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });

  user: User;
  edit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.data.user;
    this.edit = this.data.edit;

    if (this.edit) {
      this.patchValues(this.user);
    }
  }

  patchValues(user: User) {
    this.userForm.patchValue({
      email: user.email,
      username: user.username
    })
  }
}
