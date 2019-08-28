// https://documentation.onesignal.com/reference#section-send-to-users-based-on-filters
export interface INotificationFilterUsersBased {
  last_session?: string;
  first_session?: string;
  session_count?: string;
  session_time?: string;
  amount_spent?: string;
  bought_sku?: string;
  tag?: string;
  language?: string;
  app_version?: string;
  location?: string;
  email?: string;
  country?: string;
}
