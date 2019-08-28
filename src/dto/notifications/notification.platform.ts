// https://documentation.onesignal.com/reference#section-platform-to-deliver-to
export interface INotificationPlatform {
  isIos?: boolean;
  isAndroid?: boolean;
  isAnyWeb?: boolean;
  isEmail?: boolean;
  isChromeWeb?: boolean;
  isFirefox?: boolean;
  isSafari?: boolean;
  isWP_WNS?: boolean;
  isAdm?: boolean;
  isChrome?: boolean;
  channel_for_external_user_ids?: string;
}
