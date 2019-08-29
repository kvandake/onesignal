import { IViewNotificationsResult } from '../../src/dto/notifications';
import { viewNotificationFaker } from './viewNotification.faker';

export const viewNotificationsFaker = {
  create,
};

function create() {
  return {
    limit: 30,
    offset: 20,
    notifications: Array(5).map(() => viewNotificationFaker.create()),
  } as IViewNotificationsResult;
}
