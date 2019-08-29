import { NotificationBuilder } from './notification.builder';
import { EmailBuilder } from './email.builder';
import {
  INotificationApp,
  INotificationFilterSegments,
  INotificationFilterSpecificDevices,
  INotificationFilterUsersBased,
} from '../../dto/notifications';
import { OneSignalError } from '../../errors';

export abstract class NotificationByBaseBuilder<FilterNotification extends INotificationApp | INotificationFilterSegments | INotificationFilterUsersBased | INotificationFilterSpecificDevices> {

  private readonly filterNotification: any;

  protected constructor(appId: string) {
    this.filterNotification = {} as FilterNotification;
    this.filterNotification.app_id = appId;
  }

  public notification(): NotificationBuilder {
    this.checkRequiredVariablesInternal();
    return new NotificationBuilder(this.filterNotification);
  }

  public email(): EmailBuilder {
    this.checkRequiredVariablesInternal();
    return new EmailBuilder(this.filterNotification);
  }

  protected get filter(): FilterNotification {
    return this.filterNotification;
  }

  protected checkRequiredVariablesInternal() {
    if (!this.filterNotification.app_id) {
      throw new OneSignalError('app_id is required');
    }
    this.checkRequiredVariables();
  }

  protected abstract checkRequiredVariables();
}

