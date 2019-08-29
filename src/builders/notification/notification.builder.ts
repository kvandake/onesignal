import {
  INotification,
  INotificationActionButtons,
  INotificationAppearance,
  INotificationAttachments,
  INotificationDelivery,
  INotificationGroupingCollapsing,
  INotificationPlatform,
} from '../../dto/notifications';
import { OneSignalError } from '../../errors';

//  https://documentation.onesignal.com/reference#section-notification-content
export class NotificationBuilder {
  constructor(private notification: INotification) {}

  public build(): INotification {
    this.checkRequiredVariables();
    return this.notification;
  }

  // region contents

  //  REQUIRED unless content_available=true or template_id is set.
  //  The notification's content (excluding the title), a map of language codes to text for each language.
  //  Each hash must have a language code string for a key, mapped to the localized text you would like users to receive for that language.
  //  This field supports inline substitutions.
  //  English must be included in the hash.
  //  Example: {"en": "English Message", "es": "Spanish Message"}
  public setContents(value: object): NotificationBuilder {
    this.notification.contents = value;
    return this;
  }

  //  The notification's title, a map of language codes to text for each language.
  //  Each hash must have a language code string for a key, mapped to the localized text you would like users to receive for that language.
  //  This field supports inline substitutions.
  //  Example: {"en": "English Title", "es": "Spanish Title"}
  public setHeadings(value: object): NotificationBuilder {
    this.notification.headings = value;
    return this;
  }

  //  The notification's subtitle, a map of language codes to text for each language.
  //  Each hash must have a language code string for a key, mapped to the localized text you would like users to receive for that language.
  //  This field supports inline substitutions.
  //  Example: {"en": "English Subtitle", "es": "Spanish Subtitle"}
  public setSubtitle(value: object): NotificationBuilder {
    this.notification.subtitle = value;
    return this;
  }

  //  Use a template you setup on our dashboard. You can override the template values by sending other parameters with the request.
  //  The template_id is the UUID found in the URL when viewing a template on our dashboard.
  //  Example: be4a8044-bbd6-11e4-a581-000c2940e62c
  public setTemplateId(value: string): NotificationBuilder {
    this.notification.template_id = value;
    return this;
  }

  //  Sending true wakes your app from background to run custom native code (Apple interprets this as content-available=1).
  //  Note: Not applicable if the app is in the "force-quit" state (i.e app was swiped away).
  //  Omit the contents field to prevent displaying a visible notification.
  public setContentAvailable(value: boolean): NotificationBuilder {
    this.notification.content_available = value;
    return this;
  }

  //  Sending true allows you to change the notification content in your app before it is displayed.
  //  Triggers didReceive(_:withContentHandler:) on your UNNotificationServiceExtension.
  public setMutableContent(value: boolean): NotificationBuilder {
    this.notification.mutable_content = value;
    return this;
  }

  // endregion

  //  These parameters let you adjust icons, sounds, badges, and other appearance changes to your push notifications.
  //  Icons - Different platforms handle icons differently.
  //  Android - Our SDK shows a bell icon by default. See our Android Notification Icons guide to change this.
  //  iOS - The icon will always be your app icon. Apple does not allow this to be configured.
  //  Sounds - By default, the device notification sound plays when a new notification arrives. You may alter this by specifying a different sound asset.
  //  Badges - shows the number of notifications outstanding. Note: Android badges are automatically handled by OneSignal.
  //  https://documentation.onesignal.com/reference#section-appearance
  public setAppearance(value: INotificationAppearance): NotificationBuilder {
    this.notification = { ...this.notification, ...value };
    return this;
  }

  //  These add buttons to push notifications, allowing the user to take more than one action on a notification.
  //  Learn more about Action Buttons.
  //  https://documentation.onesignal.com/reference#section-action-buttons
  public setActionButtons(value: INotificationActionButtons): NotificationBuilder {
    this.notification = { ...this.notification, ...value };
    return this;
  }

  //  Schedule notification for future delivery.
  //  https://documentation.onesignal.com/reference#section-delivery
  public setDelivery(value: INotificationDelivery): NotificationBuilder {
    this.notification = { ...this.notification, ...value };
    return this;
  }

  //  These are additional content attached to push notifications, primarily images.
  //  https://documentation.onesignal.com/reference#section-attachments
  public setAttachments(value: INotificationAttachments): NotificationBuilder {
    this.notification = { ...this.notification, ...value };
    return this;
  }

  //  Grouping lets you combine multiple notifications into a single notification to improve the user experience.
  //  Collapsing lets you dismiss old notifications in favor of newer ones.
  // https://documentation.onesignal.com/reference#section-grouping-collapsing
  public setGroupingAndCollapsing(value: INotificationGroupingCollapsing): NotificationBuilder {
    this.notification = { ...this.notification, ...value };
    return this;
  }

  //  By default, OneSignal will send to every platform (each of these is true).
  //  To only send to specific platforms, you may pass in true on one or more of these parameters corresponding to the platform you wish to send to. If you do so, all other platforms will be set to false and will not be delivered to.
  //  These parameters will be ignored if sending to devices directly with include_player_ids
  //  https://documentation.onesignal.com/reference#section-platform-to-deliver-to
  public setPlatform(value: INotificationPlatform): NotificationBuilder {
    this.notification = { ...this.notification, ...value };
    return this;
  }

  private checkRequiredVariables() {
    if (!this.notification.contents) {
      if (!this.notification.content_available || !this.notification.template_id) {
        throw new OneSignalError('contents is required');
      }
    }
  }
}
