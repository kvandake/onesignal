// https://documentation.onesignal.com/reference#section-grouping-collapsing
export interface INotificationGrouping {
  android_group?: string;
  android_group_message?: object;
  adm_group?: string;
  adm_group_message?: object;
  thread_id?: string;
  summary_arg?: string;
  summary_arg_count?: number;
}
