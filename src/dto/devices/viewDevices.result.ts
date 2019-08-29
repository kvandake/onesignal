import { IViewDeviceResult } from './viewDevice.result';
import { IListResult } from '../common';

export interface IViewDevicesResult extends IListResult {
  players: IViewDeviceResult[]
}
