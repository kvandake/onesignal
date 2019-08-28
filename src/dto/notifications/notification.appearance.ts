import { AndroidVisibility, IosBadgeType } from '../../enums';

// https://documentation.onesignal.com/reference#section-appearance
export interface INotificationAppearance {
  android_channel_id?: string;
  existing_android_channel_id?: string;
  android_background_layout?: object;
  small_icon?: string;
  large_icon?: string;
  adm_small_icon?: string;
  adm_large_icon?: string;
  chrome_web_icon?: string;
  chrome_web_image?: string;
  chrome_web_badge?: string;
  firefox_icon?: string;
  chrome_icon?: string;
  ios_sound?: string;
  android_sound?: string;
  adm_sound?: string;
  wp_wns_sound?: string;
  android_led_color?: string;
  android_accent_color?: string;
  android_visibility?: AndroidVisibility;
  ios_badgeType?: IosBadgeType;
  ios_badgeCount?: number;
  collapse_id?: string;
  apns_alert?: object;
}
