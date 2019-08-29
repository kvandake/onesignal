import { viewDeviceResultFaker } from './viewDevice.result.faker';
import { IViewDevicesResult } from '../../src/dto/devices';

export const viewDevicesResultFaker = {
  create,
};

function create() {
  return {
    limit: 30,
    offset: 20,
    players: Array(5).map(() => viewDeviceResultFaker.create()),
  } as IViewDevicesResult;
}
