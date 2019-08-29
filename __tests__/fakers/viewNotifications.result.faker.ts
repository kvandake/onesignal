import { IViewNotificationsResult } from '../../src/dto/notifications';
import { viewNotificationResultFaker } from './viewNotification.result.faker';

export const viewNotificationsResultFaker = {
  create,
};

function create() {
  return {
    limit: 30,
    offset: 20,
    notifications: Array(5).map(() => viewNotificationResultFaker.create()),
  } as IViewNotificationsResult;
}
