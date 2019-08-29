import { ICreateDeviceInput } from './createDevice.input';

export interface IUpdateDeviceInput extends ICreateDeviceInput {
  id: string,
}
