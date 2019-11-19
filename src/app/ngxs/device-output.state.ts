import {State, Action, StateContext, Selector} from '@ngxs/store';
import {DeviceOutput} from '../models/deviceOutput.model';
import {DeviceOutputService} from '../services/model-services/device-output.service';
import {AddDeviceOutput, GetById, GetDeviceOutputs, RemoveDeviceOutput, UpdateDeviceOutput} from './device-output.actions';

export class DeviceOutputStateModel {
  deviceOutputs: DeviceOutput[];
  deviceOutput: DeviceOutput;
}

@State<DeviceOutputStateModel>({
  name: 'deviceOutputState',
  defaults: {
    deviceOutputs: [],
    deviceOutput: null
  }
})

export class DeviceOutputState {

  constructor(public deviceOutputService: DeviceOutputService) {
  }

  @Selector()
  static getDeviceOutputs(state: DeviceOutputStateModel) {
    return state.deviceOutputs;
  }

  @Selector()
  static getDeviceOutputsById(state: DeviceOutputStateModel) {
    return state.deviceOutput;
  }

  @Action(AddDeviceOutputs)
  add({getState, patchState}: StateContext<DeviceOutputStateModel>, {payload}: AddDeviceOutput) {
    this.deviceOutputService.createDeviceOutput(payload).subscribe(() => {
      const state = getState();
      patchState({
        deviceOutputs: [...state.deviceOutputs, payload]
      });
    });
  }

  @Action(RemoveDeviceOutput)
  remove({getState, patchState}: StateContext<DeviceOutputStateModel>, {id}: RemoveDeviceOutput) {
    this.deviceOutputService.deleteDeviceOutput(id).subscribe(() => {
      const state = getState();
      patchState({
        deviceOutputs: state.deviceOutputs.filter(deviceOutput => deviceOutput.id != id )
      });
    });
  }

  @Action(UpdateDeviceOutput)
  update({getState, patchState}: StateContext<DeviceOutputStateModel>, {id, payload}: UpdateDeviceOutput) {
    this.deviceOutputService.updateDeviceOutput(id, payload).subscribe(() => {
      const state = getState();
      const index = state.deviceOutputs.findIndex(o => o.id === id);

      payload.id = id;
      state.deviceOutputs[index] = payload;
      patchState({
        deviceOutputs: [...state.deviceOutputs]
      })
    })
  }

  @Action(GetDeviceOutputs)
  get({getState, patchState}: StateContext<DeviceOutputStateModel>, {}: GetDeviceOutputs) {
    this.deviceOutputService.getDeviceOutputs().subscribe(outputResults => {
      patchState({
        deviceOutputs: outputResults,
      });
    });
  }

  @Action(GetById)
  getById({getState, patchState}: StateContext<DeviceOutputStateModel>, {id}: GetById) {
    const state = getState();
    patchState({
      deviceOutput: state.deviceOutput.find(o => o.id === id)
    });
  }
}
