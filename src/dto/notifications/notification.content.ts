// https://documentation.onesignal.com/reference#section-notification-content
export interface INotificationContent {
  contents?: object;
  headings?: object;
  subtitle?: object;
  template_id?: string;
  content_available?: boolean;
  mutable_content?: boolean;
}
