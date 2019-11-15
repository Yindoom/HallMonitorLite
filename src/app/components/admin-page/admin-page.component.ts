import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/services/model-services/user.service';
import { MatDialog } from '@angular/material';
import { UserCreateUpdateComponent } from '../user-create-update/user-create-update.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  userList: Observable<User[]>;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  //TODO ADD THE REST (UPDATEING AND DELETETING)
  ngOnInit() {
    this.userList = this.userService.getUsers();
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      console.log('succesfully deleted user with id ' + id);
    });
  }

  updateUser(user: User) {
    this.dialog.open(UserCreateUpdateComponent, {
      data: { user: user, edit: true }
    });
  }

  createUser() {
    this.dialog.open(UserCreateUpdateComponent, {
      data: { edit: false }
    });
  }
}
