import { NotificationByBaseBuilder } from './notificationByBase.builder';
import { INotificationFilterUsersBased } from '../../dto/notifications';

// https://documentation.onesignal.com/reference#section-send-to-users-based-on-filters
export class NotificationByFilterBuilder extends NotificationByBaseBuilder<INotificationFilterUsersBased> {
  //  relation = ">" or "<"
  //  hours_ago = number of hours before or after the users last session.
  //  Example: "1.1"
  public setLastSession(value: string): NotificationByFilterBuilder {
    this.filter.last_session = value;
    return this;
  }

  //  relation = ">" or "<"
  //  hours_ago = number of hours before or after the users first session.
  //  Example: "1.1"
  public setFirstSession(value: string): NotificationByFilterBuilder {
    this.filter.first_session = value;
    return this;
  }

  //  relation = ">", "<", "=" or "!="
  //  value = number sessions.
  //  Example: "1"
  public setSessionCount(value: string): NotificationByFilterBuilder {
    this.filter.session_count = value;
    return this;
  }

  //  relation = ">" or "<"
  //  value = Time in seconds the user has been in your app.
  //  Example: "3600"
  public setSessionTime(value: string): NotificationByFilterBuilder {
    this.filter.session_time = value;
    return this;
  }

  //  relation = ">", "<", or "="
  //  value = Amount in USD a user has spent on IAP (In App Purchases).
  //  Example: "0.99"
  public setAmountSpent(value: string): NotificationByFilterBuilder {
    this.filter.amount_spent = value;
    return this;
  }

  //  relation = ">", "<" or "="
  //  key = SKU purchased in your app as an IAP (In App Purchases). Example: "com.domain.100coinpack"
  //  value = value of SKU to compare to.
  //  Example: "0.99"
  public setBoughtSku(value: string): NotificationByFilterBuilder {
    this.filter.bought_sku = value;
    return this;
  }

  //  relation = ">", "<", "=", "!=", "exists", "not_exists", "time_elapsed_gt" (paid plan only) or "time_elapsed_lt"
  //  (paid plan only) See Time Operators
  //  key = Tag key to compare.
  //  value = Tag value to compare. Not required for "exists" or "not_exists".
  //  Example: See Formatting Filters
  public setTag(value: string): NotificationByFilterBuilder {
    this.filter.tag = value;
    return this;
  }

  //  relation = "=" or "!="
  //  value = 2 character language code.
  //  Example: "en". For a list of all language codes go here
  public setLanguage(value: string): NotificationByFilterBuilder {
    this.filter.language = value;
    return this;
  }

  //  relation = ">", "<", "=" or "!="
  //  value = app version.
  //  Example: "1.0.0"
  public setAppVersion(value: string): NotificationByFilterBuilder {
    this.filter.app_version = value;
    return this;
  }

  //  radius = in meters
  //  lat = latitude
  //  long = longitude
  public setLocation(value: string): NotificationByFilterBuilder {
    this.filter.location = value;
    return this;
  }

  //  Only for sending Push Notifications
  //  Use this for targeting push subscribers associated with an email set with all SDK setEmail methods
  //  To send emails to specific email addresses use include_email_tokens parameter
  public setEmail(value: string): NotificationByFilterBuilder {
    this.filter.email = value;
    return this;
  }

  //  relation = "="
  //  value = 2-digit Country code
  //  Example: "field": "country", "relation": "=", "value", "US"
  public setCountry(value: string): NotificationByFilterBuilder {
    this.filter.country = value;
    return this;
  }

  protected checkRequiredVariables() {
    // without required variables. See docs.
  }
}
