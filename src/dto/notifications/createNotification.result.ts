// https://documentation.onesignal.com/reference#section-results-create-notification
export interface ICreateNotificationResult {
  id: string;
  recipients: number;
  errors?: string[];
}
