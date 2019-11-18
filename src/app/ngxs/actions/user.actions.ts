import {User} from '../../shared/models/user.model';

// do we need to set the user? also should USER be in all caps?

export class AddUser{
  static readonly type = '[User] Add';

  constructor(public payload: User) {}
}

export class UpdateUser{
  static readonly type = '[User] Update';

  constructor(public payload: User) {}
}

export class RemoveUser{
  static readonly type = '[User] Remove';

  constructor(public payload: string) {}
}

export class GetUsers{
  static readonly type = '[User] Get';

  constructor(public payload: User[]) {}
}

export class GetUserById{
  static readonly type = '[User] Get';

  constructor(public id: string) {}
}
