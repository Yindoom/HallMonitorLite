import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { MatDialog } from '@angular/material';
import { UserCreateUpdateComponent } from '../../user/user-create-update/user-create-update.component';
import {Store, Select} from '@ngxs/store'
import {GetById, GetUsers, RemoveUser} from '../../user/ngxs/actions/user.actions';
import {UserState} from '../../user/ngxs/user.state';
import {RemoveHashPlugin} from '@angular-devkit/build-angular/src/angular-cli-files/plugins/remove-hash-plugin';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  @Select(UserState.getUsers) userList: Observable<User[]>;

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetUsers());
  }

  deleteUser(id: number) {
    this.store.dispatch(new RemoveUser(id));
  }

  updateUser(id: number) {
    this.store.dispatch(new GetById(id)).subscribe(()=>{
      this.dialog.open(UserCreateUpdateComponent, {
        data: { edit: true }
      });
    });
  }

  createUser() {
    this.dialog.open(UserCreateUpdateComponent, {
      data: { edit: false }
    });
  }
}
