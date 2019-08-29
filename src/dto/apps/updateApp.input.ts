import { ICreateAppInput } from './createApp.input';

// https://documentation.onesignal.com/reference#update-an-app
export interface IUpdateAppInput extends ICreateAppInput {
  id: string,
}
