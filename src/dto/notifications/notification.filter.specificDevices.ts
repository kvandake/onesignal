// https://documentation.onesignal.com/reference#section-send-to-specific-devices
export interface INotificationFilterSpecificDevices {
  include_player_ids?: string[];
  include_external_user_ids?: string[];
  include_email_tokens?: string[];
}
