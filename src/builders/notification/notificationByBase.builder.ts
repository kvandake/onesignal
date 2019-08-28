import { NotificationBuilder } from './notification.builder';
import { EmailBuilder } from './email.builder';
import { INotificationFilterSegments } from '../../dto/notifications/notification.filter.segments';
import { INotificationFilterUsersBased } from '../../dto/notifications/notification.filter.usersBased';
import { INotificationFilterSpecificDevices } from '../../dto/notifications/notification.filter.specificDevices';
import { INotificationApp } from '../../dto/notifications/notification.app';

export abstract class NotificationByBaseBuilder<FilterNotification extends INotificationApp | INotificationFilterSegments | INotificationFilterUsersBased | INotificationFilterSpecificDevices> {

  // tslint:disable-next-line:variable-name
  private readonly filterNotification: any;

  protected constructor(appId: string) {
    this.filterNotification = {} as FilterNotification;
    this.filterNotification.app_id = appId;
  }

  public notification(): NotificationBuilder {
    this.checkRequiredVariables();
    return new NotificationBuilder(this.filterNotification);
  }

  public email(): EmailBuilder {
    this.checkRequiredVariables();
    return new EmailBuilder(this.filterNotification);
  }

  protected get filter(): FilterNotification {
    return this.filterNotification;
  }

  protected abstract checkRequiredVariables();
}

