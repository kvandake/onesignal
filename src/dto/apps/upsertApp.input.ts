import { ApnsEnv } from '../../enums';

// https://documentation.onesignal.com/reference#section-result-format-create-an-app
export interface IUpsertAppInput {
  name: string,
  apns_env?: ApnsEnv,
  apns_p12?: string,
  apns_p12_password?: string,
  gcm_key?: string,
  android_gcm_sender_id?: string,
  chrome_web_origin?: string,
  chrome_web_default_notification_icon?: string,
  chrome_web_sub_domain?: string,
  safari_apns_p12?: string,
  safari_apns_p12_password?: string,
  site_name?: string,
  safari_site_origin?: string,
  safari_icon_256_256?: string,
  chrome_key?: string,
  additional_data_is_root_payload?: boolean,
  organization_id?: string,
}
