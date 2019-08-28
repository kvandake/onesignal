import { NotificationByBaseBuilder } from './notificationByBase.builder';
import { OneSignalError } from '../../errors';
import { INotificationFilterSpecificDevices } from '../../dto/notifications/notification.filter.specificDevices';

// https://documentation.onesignal.com/reference#section-send-to-specific-devices
export class NotificationByDeviceBuilder extends NotificationByBaseBuilder<INotificationFilterSpecificDevices> {

  constructor(appId: string) {
    super(appId);
  }

//  Specific players to send your notification to. Does not require API Auth Key.
  //  Do not combine with other targeting parameters. Not compatible with any other targeting parameters.
  //  Example: ["1dd608f2-c6a1-11e3-851d-000c2940e62c"]
  //  Limit of 2,000 entries per REST API call
  public setIncludePlayerIds(value: string[]): NotificationByDeviceBuilder {
    this.filter.include_player_ids = value;
    return this;
  }

  //  Target specific devices by custom user IDs assigned via API. Not compatible with any other targeting parameters
  //  Example: [“custom-id-assigned-by-api”]
  //  Limit of 2,000 entries per REST API call.
  //  Note: If targeting push and email subscribers with same ids, use with channel_for_external_user_ids to indicate
  //  you are sending a push or email.
  public setIncludeExternalUserIds(value: string[]): NotificationByDeviceBuilder {
    this.filter.include_external_user_ids = value;
    return this;
  }

  //  For Sending Emails - Target specific email addresses.
  //  If an email does not correspond to an existing user, a new user will be created.
  //  Example: nick@catfac.ts
  //  Limit of 2,000 entries per REST API call
  public setIncludeEmailTokens(value: string[]): NotificationByDeviceBuilder {
    this.filter.include_email_tokens = value;
    return this;
  }

  protected checkRequiredVariables() {
    if (!this.filter.include_player_ids && !this.filter.include_external_user_ids && !this.filter.include_email_tokens) {
      throw new OneSignalError('include_player_ids, include_external_user_ids or include_email_tokens are required');
    }
  }
}
