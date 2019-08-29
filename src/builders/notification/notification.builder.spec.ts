import { OneSignalError } from '../../errors';
import {
  INotification,
  INotificationActionButtons,
  INotificationAppearance,
  INotificationAttachments,
  INotificationDelivery,
  INotificationGroupingCollapsing,
  INotificationPlatform,
} from '../../dto/notifications';
import { NotificationBuilder } from './notification.builder';
import { DelayedOption } from '../../enums';

describe('NotificationBuilder', () => {
  let builder: NotificationBuilder;

  beforeEach(() => {
    builder = new NotificationBuilder({} as INotification);
  });

  it('should valid variables', () => {
    // arrange
    const content = { title: 'title' };
    const headings = { title: 'title' };
    const subTitle = { title: 'title' };
    const contentAvailable = true;
    const mutableContent = true;
    const templateId = 'templateId';
    const appearance = {
      small_icon: 'small_icon',
      adm_sound: 'adm_sound',
    } as INotificationAppearance;
    const platform = {
      isAndroid: true,
      isChromeWeb: true,
    } as INotificationPlatform;
    const grouping = {
      android_group: 'android_group',
      summary_arg: 'summary_arg',
    } as INotificationGroupingCollapsing;
    const actionButtons = {
      ios_category: 'ios_category',
    } as INotificationActionButtons;
    const delivery = {
      delayed_option: DelayedOption.LastActive,
      priority: 2,
    } as INotificationDelivery;
    const attachments = {
      url: 'url',
      app_url: 'app_url',
    } as INotificationAttachments;

    // act
    builder.setContents(content);
    builder.setHeadings(headings);
    builder.setSubtitle(subTitle);
    builder.setMutableContent(mutableContent);
    builder.setContentAvailable(contentAvailable);
    builder.setTemplateId(templateId);
    builder.setAppearance(appearance);
    builder.setPlatform(platform);
    builder.setGroupingAndCollapsing(grouping);
    builder.setActionButtons(actionButtons);
    builder.setDelivery(delivery);
    builder.setAttachments(attachments);
    const result = builder.build();

    // assert
    expect(result.contents).toEqual(content);
    expect(result.headings).toEqual(headings);
    expect(result.subtitle).toEqual(subTitle);
    expect(result.mutable_content).toEqual(mutableContent);
    expect(result.content_available).toEqual(contentAvailable);
    expect(result.template_id).toEqual(templateId);
    expect(result.small_icon).toEqual(appearance.small_icon);
    expect(result.adm_sound).toEqual(appearance.adm_sound);
    expect(result.isAndroid).toEqual(platform.isAndroid);
    expect(result.isChromeWeb).toEqual(platform.isChromeWeb);
    expect(result.android_group).toEqual(grouping.android_group);
    expect(result.summary_arg).toEqual(grouping.summary_arg);
    expect(result.ios_category).toEqual(actionButtons.ios_category);
    expect(result.delayed_option).toEqual(delivery.delayed_option);
    expect(result.priority).toEqual(delivery.priority);
    expect(result.url).toEqual(attachments.url);
    expect(result.app_url).toEqual(attachments.app_url);
  });

  it('should check required variables', () => {
    // act & assert
    expect(() => builder.build()).toThrowError(OneSignalError);
  });
});
