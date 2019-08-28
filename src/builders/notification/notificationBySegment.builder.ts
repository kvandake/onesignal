import { NotificationByBaseBuilder } from './notificationByBase.builder';
import { OneSignalError } from '../../errors';
import { INotificationFilterSegments } from '../../dto/notifications/notification.filter.segments';

// https://documentation.onesignal.com/reference#section-send-to-segments
export class NotificationBySegmentBuilder extends NotificationByBaseBuilder<INotificationFilterSegments> {

  constructor(appId: string) {
    super(appId);
  }

//  The segment names you want to target. Users in these segments will receive a notification.
  //  This targeting parameter is only compatible with excluded_segments
  //  Example: ["Active Users", "Inactive Users"]
  public setIncludedSegments(value: string[]): NotificationBySegmentBuilder {
    this.filter.included_segments = value;
    return this;
  }

  //  Segment that will be excluded when sending. Users in these segments will not receive a notification,
  //  even if they were included in included_segments.
  //  This targeting parameter is only compatible with included_segments.
  // Example: ["Active Users", "Inactive Users"]
  public setExcludedSegments(value: string[]): NotificationBySegmentBuilder {
    this.filter.excluded_segments = value;
    return this;
  }

  protected checkRequiredVariables() {
    if (!this.filter.included_segments) {
      throw new OneSignalError('included_segments is required');
    }
  }
}
