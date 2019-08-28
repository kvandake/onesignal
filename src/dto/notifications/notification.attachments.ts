// https://documentation.onesignal.com/reference#section-attachments
export interface INotificationAttachments {
  data?: object;
  url?: string;
  web_url?: string;
  app_url?: string;
  ios_attachments?: object;
  big_picture?: string;
  adm_big_picture?: string;
  chrome_big_picture?: string;
}
