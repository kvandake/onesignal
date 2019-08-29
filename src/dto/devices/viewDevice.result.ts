export interface IViewDeviceResult {
  identifier: string;
  session_count: number;
  language: string;
  timezone: number;
  game_version: string;
  device_os: string;
  device_type: number;
  device_model: string;
  ad_id: null;
  tags: object;
  last_active: number;
  amount_spent: number;
  created_at: number;
  invalid_identifier: boolean;
  badge_count: number;
  external_user_id: null;
}
