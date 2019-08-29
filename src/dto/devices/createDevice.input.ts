import { DeviceType, NotificationType, TestType } from '../../enums';

//  https://documentation.onesignal.com/reference#section-body-parameters-add-a-device
export interface ICreateDeviceInput {
  //  The device's platform:
  device_type: DeviceType;
  //  Only required if you have enabled Identity Verification and device identifier is email
  email_auth_hash?: string;
  //  RECOMMENDED Push notification identifier from Google or Apple. For Apple push identifiers, you must strip all non alphanumeric characters.
  identifier?: string;
  //  RECOMMENDED Language code. Typically lower case two letters, except for Chinese where it must be one of zh-Hans or zh-Hant. Example: en
  language?: string;
  //  RECOMMENDED Number of seconds away from UTC. Example: -28800
  timezone?: number;
  //  RECOMMENDED Version of your app. Example: 1.1
  game_version?: string;
  //  RECOMMENDED Device make and model. Example: iPhone5,1
  device_model?: string;
  //  RECOMMENDED Device operating system version. Example: 7.0.4
  device_os?: string;
  //  RECOMMENDED The ad id for the device's platform:
  //  ANDROID = Advertising Id
  //  iOS = identifierForVendor
  //  WP8.1 = AdvertisingId
  ad_id?: string;
  //  RECOMMENDED Name and version of the plugin that's calling this API method (if any)
  sdk?: string;
  //  Number of times the user has played the game, defaults to 1
  session_count?: number;
  //  Custom tags for the player. Only support string key value pairs.
  //  Does not support arrays or other nested objects.
  //  Example: {"foo":"bar","this":"that"}
  tags?: object;
  //  Amount the user has spent in USD, up to two decimal places
  amount_spent?: string;
  //  Unix timestamp indicating date and time when the player joined the app/site.
  created_at?: number;
  //  Seconds player was running your app.
  playtime?: number;
  //  Current iOS badge count displayed on the app icon
  //  NOTE: Not supported for apps created after June 2018, since badge count for apps created after this date are handled on the client.
  badge_count?: number;
  //  Date and time when the player was last active.
  //  Format: yyyy-mm-dd hh24:mi:ss.US UTC+0
  last_active?: number;
  //  iOS - These values are set each time the user opens the app from the SDK. Use the SDK function set Subscription instead.
  //  ANDROID - You may set this but you can no longer use the SDK method setSubscription later in your app as it will
  //  create synchronization issues.
  notification_types?: NotificationType;
  //  This is used in deciding whether to use your iOS Sandbox or Production push certificate when
  //  sending a push when both have been uploaded. Set to the iOS provisioning profile that was used to build your app.
  test_type?: TestType;
  //  Longitude of the device, used for geotagging to segment on.
  long?: number;
  // Latitude of the device, used for geotagging to segment on.
  lat?: number;
  //  Country code in the ISO 3166-1 Alpha 2 format
  country?: string;
  //  A custom user ID
  external_user_id?: string;
}
