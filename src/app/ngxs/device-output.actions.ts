import {DeviceOutput} from '../models/deviceOutput.model';

export class AddDeviceOutput{
  static readonly type = '[DeviceOutput] Add';

  constructor(public payload: DeviceOutput) {}
}

export class UpdateDeviceOutput{
  static readonly type = '[DeviceOutput] Update';

  constructor(public id: number, public payload: DeviceOutput) {}
}

export class RemoveDeviceOutput{
  static readonly type = '[DeviceOutput] Remove';

  constructor(public id: number) {}
}

export class GetDeviceOutputs{
  static readonly type = '[DeviceOutput] GetAll';

  constructor() {}
}

export class GetById {
  static readonly type = '[DeviceOutput] Get';

  constructor(public id: number) {}
}
