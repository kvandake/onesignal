import { ApnsEnv } from '../../enums';

// https://documentation.onesignal.com/reference#section-result-format-create-an-app
export interface IAppResult {
  id: string;
  name: string;
  players: number;
  messageable_players: number;
  updated_at: Date;
  created_at: Date;
  gcm_key: string;
  chrome_web_origin: string;
  chrome_web_default_notification_icon: string;
  chrome_web_sub_domain: string;
  apns_env: ApnsEnv;
  apns_certificates: string;
  safari_apns_certificate: string;
  safari_site_origin: string;
  safari_push_id: string;
  safari_icon_16_16: string;
  safari_icon_32_32: string;
  safari_icon_64_64: string;
  safari_icon_128_128: string;
  safari_icon_256_256: string;
  site_name: string;
  basic_auth_key: string;
}
