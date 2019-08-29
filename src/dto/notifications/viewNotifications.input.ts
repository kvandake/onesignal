export interface IViewNotificationsInput {
  app_id: string;
  limit: number;
  offset: number;
  //  Kind of notifications returned. Default (not set) is all notification types.
  //  Dashboard only is 0.
  //  API only is 1.
  //  Automated only is 3.
  kind: number;
}
