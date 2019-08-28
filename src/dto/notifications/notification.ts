import { INotificationContent } from './notification.content';
import { IEmailContent } from './notification.email.content';
import { INotificationIdempotency } from './notification.idempotency';
import { INotificationFilterSegments } from './notification.filter.segments';
import { INotificationFilterSpecificDevices } from './notification.filter.specificDevices';
import { INotificationFilterUsersBased } from './notification.filter.usersBased';
import { INotificationAttachments } from './notification.attachments';
import { INotificationAppearance } from './notification.appearance';
import { INotificationActionButtons } from './notification.actionButtons';
import { INotificationGrouping } from './notification.grouping';
import { INotificationPlatform } from './notification.platform';
import { INotificationDelivery } from './notification.delivery';
import { INotificationApp } from './notification.app';

export interface INotification extends INotificationApp, INotificationContent, IEmailContent,
  INotificationIdempotency, INotificationAttachments, INotificationAppearance, INotificationActionButtons,
  INotificationFilterSegments, INotificationFilterSpecificDevices, INotificationFilterUsersBased,
  INotificationGrouping, INotificationPlatform, INotificationDelivery {

}
