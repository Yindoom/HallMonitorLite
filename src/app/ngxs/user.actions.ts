import {User} from '../models/user.model';

export class AddUser {
  static readonly type = '[User] Add';

  constructor(public payload: User) {
  }
}

export class UpdateUser {
  static readonly type = '[User] Update';

  constructor(public id: number, public payload: User) {
  }
}

export class RemoveUser {
  static readonly type = '[User] Remove';

  constructor(public id: number) {
  }
}

export class GetUsers {
  static readonly type = '[User] GetAll';

  constructor() {
  }
}

export class GetById {
  static readonly type = '[User] Get';

  constructor(public id: number) {
  }
}

export class GetUserByIdFromDB {
  static readonly type = '[User] GetDB';

  constructor(public id: number) {
  }
}
