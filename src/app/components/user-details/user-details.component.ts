import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserState} from '../../ngxs/user.state';
import {User} from '../../models/user.model';
import {Select, Store} from '@ngxs/store';
import {GetById, GetUserByIdFromDB, GetUsers, UpdateUser} from '../../ngxs/user.actions';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/model-services/user.service';
import {UserCreateUpdateComponent} from '../user-create-update/user-create-update.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Select(UserState.getUserById) editUser: Observable<User>;

  user: User;

  constructor(private store: Store,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.dispatch(new GetUserByIdFromDB(this.authService.getLoggedInUserId()));

    this.editUser.subscribe(u => {
      this.user = u;
    });
  }

  updateUser(id: number) {
    this.store.dispatch(new GetById(id)).subscribe(() => {
      this.dialog.open(UserCreateUpdateComponent, {
        data: {edit: true}
      });
    });
  }
}
