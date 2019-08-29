import { INotificationContent } from './notification.content';
import { IEmailContent } from './notification.email.content';
import { INotificationIdempotency } from './notification.idempotency';
import { INotificationFilterSegments } from './notification.filter.segments';
import { INotificationFilterDevices } from './notification.filter.devices';
import { INotificationFilterUsers } from './notification.filter.users';
import { INotificationAttachments } from './notification.attachments';
import { INotificationAppearance } from './notification.appearance';
import { INotificationActionButtons } from './notification.actionButtons';
import { INotificationGroupingCollapsing } from './notification.grouping.collapsing';
import { INotificationPlatform } from './notification.platform';
import { INotificationDelivery } from './notification.delivery';

export interface INotification
  extends INotificationContent,
    IEmailContent,
    INotificationIdempotency,
    INotificationAttachments,
    INotificationAppearance,
    INotificationActionButtons,
    INotificationFilterSegments,
    INotificationFilterDevices,
    INotificationFilterUsers,
    INotificationGroupingCollapsing,
    INotificationPlatform,
    INotificationDelivery {}
