import {State, Action, StateContext, Selector} from '@ngxs/store';
import {User} from '../models/user.model';
import {UserService} from '../services/model-services/user.service';
import {AddUser, GetById, GetUserByIdFromDB, GetUsers, RemoveUser, UpdateUser} from './user.actions';

export class UserStateModel {
  users: User[];
  user: User;
}


@State<UserStateModel>({
  name: 'userState',
  defaults: {
    users: [],
    user: null
  }
})

export class UserState {

  constructor(public userService: UserService) {
  }

  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Selector()
  static getUserById(state: UserStateModel) {
    return state.user;
  }

  @Action(AddUser)
  add({getState, patchState}: StateContext<UserStateModel>, {payload}: AddUser) {
    this.userService.createUser(payload).subscribe(() => {
      const state = getState();
      patchState({
        users: [...state.users, payload]
      });
    });
  }

  @Action(RemoveUser)
  remove({getState, patchState}: StateContext<UserStateModel>, {id}: RemoveUser) {
    this.userService.deleteUser(id).subscribe(() => {
      const state = getState();
      patchState({
        users: state.users.filter(user => user.id != id)
      });
    });
  }

  @Action(UpdateUser)
  update({getState, patchState}: StateContext<UserStateModel>, {id, payload}: UpdateUser) {
    this.userService.updateUser(id, payload).subscribe(() => {
      const state = getState();
      const index = state.users.findIndex(u => u.id === id);
      payload.id = id;
      state.users[index] = payload;
      patchState({
        users: [...state.users]
      });
    });
  }

  @Action(GetUsers)
  get({getState, patchState}: StateContext<UserStateModel>, {}: GetUsers) {
    this.userService.getUsers().subscribe(userResults => {
      patchState({
        users: userResults,
      });
    });
  }

  @Action(GetById)
  getById({getState, patchState}: StateContext<UserStateModel>, {id}: GetById) {
    const state = getState();
    patchState({
      user: state.users.find(u => u.id === id)
    });
  }

  @Action(GetUserByIdFromDB)
  getUserById({getState, patchState}: StateContext<UserStateModel>, {id}: GetUserByIdFromDB) {
    this.userService.getUserById(id).subscribe(u => {
      patchState({
        user: u
      });
    });
  }
}
