import { DelayedOption } from '../../enums';

// https://documentation.onesignal.com/reference#section-delivery
export interface INotificationDelivery {
  send_after?: string | number;
  delayed_option?: DelayedOption;
  delivery_time_of_day?: string;
  ttl?: number;
  priority?: number;
}
