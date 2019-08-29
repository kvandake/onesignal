import { NotificationByBaseBuilder } from './notificationByBase.builder';
import { INotificationFilterUsers } from '../../dto/notifications';

// https://documentation.onesignal.com/reference#section-send-to-users-based-on-filters
export class NotificationByFilterBuilder extends NotificationByBaseBuilder<INotificationFilterUsers> {
  //  Filters are a powerful way to target users, allowing you to use both data that
  //  OneSignal has about a user and any Tags your app may send OneSignal.
  //  Filters can be combined together to form advanced, highly precise user targeting.
  //  OneSignal customers use all sorts of filters to send notifications, including language, location, user activity, and more.
  //  https://documentation.onesignal.com/reference#section-send-to-users-based-on-filters
  public setFilters(value: object): NotificationByFilterBuilder {
    this.filter.filters = value;
    return this;
  }

  protected checkRequiredVariables() {
    // without required variables. See docs.
  }
}
