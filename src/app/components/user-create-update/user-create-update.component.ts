import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {User} from 'src/app/models/user.model';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../../ngxs/user.state';
import {Observable} from 'rxjs';
import {AddUser, UpdateUser, GetById} from '../../ngxs/user.actions';

@Component({
  selector: 'app-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    repeatedPassword: new FormControl('')
  });

  btnMessage = 'Create';

  user: User;
  edit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
    private store: Store,
    private snackbar: MatSnackBar
  ) {
  }

  @Select(UserState.getUserById) editUser: Observable<User>;

  ngOnInit() {/**/
    this.edit = this.data.edit;
    if (this.edit) {
      this.btnMessage = 'Update';
      this.editUser.subscribe(user => {
        this.user = user;
        this.patchValues(this.user);
      });
    }
  }

  patchValues(user: User) {
    console.log(user.id);
    this.userForm.patchValue({
      email: user.email,
      username: user.username
    });
  }

  userUpdateCreate() {
    const u: User = this.userForm.value;
    if (this.edit) {
      if (this.userForm.value.password == this.userForm.value.repeatedPassword) {
        this.store.dispatch(new UpdateUser(this.user.id, u)).subscribe(() => {
          this.dialogRef.close();
          this.snackbar.open('You just updated ' + this.user.username, 'Ok', {duration: 3000});
        });
      } else {
        this.snackbar.open('Passwords do not match', 'Ok', {duration: 3000});
      }
    } else {
      if (this.userForm.value.password == this.userForm.value.repeatedPassword) {
        this.store.dispatch(new AddUser(u)).subscribe(() => {
          this.dialogRef.close();
          this.snackbar.open('You just added ' + u.username, 'Ok', {duration: 3000});
        });
      } else {
        this.snackbar.open('Passwords do not match', 'Ok', {duration: 3000});
      }
    }
  }
}
