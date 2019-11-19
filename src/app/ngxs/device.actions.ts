import {Device} from '../models/device.model';

export class AddDevice{
  static readonly type = '[Device] Add';

  constructor(public payload: Device) {}
}

export class UpdateDevice{
  static readonly type = '[Device] Update';

  constructor(public id: number, public payload: Device) {}
}

export class RemoveDevice{
  static readonly type = '[Device] Remove';

  constructor(public id: number) {}
}

export class GetDevices{
  static readonly type = '[Device] Get';

  constructor() {}
}

export class GetById{
  static readonly type = '[Device] Get';

  constructor(public id: number) {}
}
