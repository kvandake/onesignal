import { IViewNotificationResult } from './viewNotification.result';
import { IListResult } from '../common';

export interface IViewNotificationsResult extends IListResult {
  notifications: IViewNotificationResult[];
}
