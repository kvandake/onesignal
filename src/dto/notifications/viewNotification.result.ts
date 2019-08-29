import { Platform } from '../../enums';

export interface IViewNotificationResult {
  id: string;
  successful: number;
  failed: number;
  converted: number;
  remaining: number;
  queued_at: number;
  send_after: number;
  completed_at: number;
  url: string;
  data: object;
  canceled: boolean;
  headings: object;
  contents: object;
  platform_delivery_stats: IPlatformDeliveryStats;
}

export type IPlatformDeliveryStats = {
  [key in Platform]: {
    success: number;
    failed: number;
    errored: number;
  };
};
