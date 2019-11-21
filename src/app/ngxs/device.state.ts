import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Device} from '../models/device.model';
import {DeviceService} from '../services/model-services/device.service';
import {AddDevice, GetById, GetDevices, RemoveDevice, UpdateDevice} from './device.actions';

export class DeviceStateModel {
  devices: Device[];
  device: Device;
}

@State<DeviceStateModel>({
  name: 'deviceState',
  defaults: {
    devices: [],
    device: null
  }
})

export class DeviceState {

  constructor(public deviceService: DeviceService) {
  }

  @Selector()
  static getDevices(state: DeviceStateModel) {
    return state.devices;
  }

  @Selector()
  static getDeviceById(state: DeviceStateModel) {
    return state.device;
  }

  @Action(AddDevice)
  add({getState, patchState}: StateContext<DeviceStateModel>, {payload}: AddDevice) {
    this.deviceService.createDevice(payload).subscribe(() => {
      const state = getState();
      patchState({
        devices: [...state.devices, payload]
      });
    });
  }

  @Action(RemoveDevice)
  remove({getState, patchState}: StateContext<DeviceStateModel>, {id}: RemoveDevice) {
    this.deviceService.deleteDevice(id).subscribe(() => {
      const state = getState();
      patchState({
        devices: state.devices.filter(device => device.id != id)
      });
    });
  }

  @Action(UpdateDevice)
  update({getState, patchState}: StateContext<DeviceStateModel>, {id, payload}: UpdateDevice) {
    this.deviceService.updateDevice(id, payload).subscribe(() => {
      const state = getState();
      const index = state.devices.findIndex(d => d.id === id);
      payload.id = id;
      state.devices[index] = payload;
      patchState({
        devices: [...state.devices]
      });
    });
  }

  @Action(GetDevices)
  get({getState, patchState}: StateContext<DeviceStateModel>, {}: GetDevices) {
    this.deviceService.getDevices().subscribe(deviceResults => {
      patchState({
        devices: deviceResults,
      });
    });
  }

  @Action(GetById)
  getById({getState, patchState}: StateContext<DeviceStateModel>, {id}: GetById) {
    const state = getState();
    patchState({
      device: state.devices.find(o => o.id === id)
    });
  }
}
