import {State, Action, StateContext, Selector} from '@ngxs/store';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../services/model-services/user.service';
import {AddUser, GetById, GetUsers, RemoveUser, UpdateUser} from '../actions/user.actions';

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
        users: state.users.filter(user => {
          return user.id != id;
        })
      });
    });
  }

  @Action(UpdateUser)
  update({getState, patchState}: StateContext<UserStateModel>, {id, payload}: UpdateUser) {
    this.userService.updateUser(id, payload).subscribe(() => console.log('Successfully updated user with id: ' + id));
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
}
