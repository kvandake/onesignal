import { NotificationBuilder } from './notification.builder';
import { EmailBuilder } from './email.builder';
import {
  INotificationFilterSegments,
  INotificationFilterDevices,
  INotificationFilterUsers,
} from '../../dto/notifications';

export abstract class NotificationByBaseBuilder<
  FilterNotification extends INotificationFilterSegments | INotificationFilterUsers | INotificationFilterDevices,
> {
  private readonly filterNotification: any = {} as FilterNotification;

  public notification(): NotificationBuilder {
    this.checkRequiredVariables();
    return new NotificationBuilder({ ...this.filterNotification });
  }

  public email(): EmailBuilder {
    this.checkRequiredVariables();
    return new EmailBuilder({ ...this.filterNotification });
  }

  protected get filter(): FilterNotification {
    return this.filterNotification;
  }

  protected abstract checkRequiredVariables();
}
