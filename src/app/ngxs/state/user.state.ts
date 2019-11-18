import { State, Action, StateContext, Selector } from '@ngxs/store';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../services/model-services/user.service';
import {AddUser, GetUserById, GetUsers, RemoveUser, UpdateUser} from '../actions/user.actions';

export class UserStateModel {
  users: User[];
  user: User;
}


@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    user: null
  }
})

export class UserState {

  constructor(public userService: UserService){}

  @Selector()
  static getUsers(state: UserStateModel){
    return state.users;
  }

  @Selector()
  static getUserById(state: UserStateModel){
    return state.user;
  }

  @Action(AddUser)
  add({getState, patchState}: StateContext<UserStateModel>, { payload }: AddUser) {
    this.userService.createUser(payload);
  }

  @Action(RemoveUser)
  remove({getState, patchState}: StateContext<UserStateModel>, { id }: RemoveUser) {
    this.userService.deleteUser(id);
  }

  @Action(UpdateUser)
  update({getState, patchState}: StateContext<UserStateModel>, { payload }: UpdateUser) {
    this.userService.updateUser(payload);
  }

  //setstate or patchstate?
  @Action(GetUsers)
  get({getState, setState}: StateContext<UserStateModel>, {}: GetUsers) {
    return this.userService.getUsers();
  }

  @Action(GetUserById)
  get({getState, patchState}: StateContext<UserStateModel>, { id }: GetUserById) {
    return this.userService.getUserById(id);
  }
}
