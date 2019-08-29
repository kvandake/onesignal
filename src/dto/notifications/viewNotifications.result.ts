import { IViewNotificationResult } from './viewNotification.result';

export interface IViewNotificationsResult {
  total_count: number,
  offset: number,
  limit: number,
  notifications: IViewNotificationResult[];
}
