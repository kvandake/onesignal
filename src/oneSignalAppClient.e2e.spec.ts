import { OneSignalAppClient } from './oneSignalAppClient';
import {
  ICancelNotificationInput,
  ITrackOpenInput,
  IViewNotificationInput,
  IViewNotificationsInput,
} from './dto/notifications';
import { NotificationByDeviceBuilder } from './builders/notification';
import { testConstants } from '../__tests__/testConstants';
import { ICreateDeviceInput, IUpdateDeviceInput, IViewDeviceInput } from './dto/devices';
import { DeviceType } from './enums';
import { INewSessionInput } from './dto/session';

const DEFAULT_DEVICE = 'f2395630-3d95-420b-8ebd-b2903d693bfd';

describe('OneSignalAppClient', () => {
  let client: OneSignalAppClient;

  function tomorrow() {
    const now = new Date();
    const result = new Date(now);
    result.setDate(result.getDate() + 1);
    return result;
  }

  beforeEach(() => {
    client = new OneSignalAppClient(testConstants.defaultApp.id, testConstants.defaultApp.restApiKey);
  });

  it('should view Notifications"', async () => {
    // arrange
    const input = { limit: 10, offset: 10 } as IViewNotificationsInput;

    // act
    const result = await client.viewNotifications(input);

    // assert
    expect(result).toBeDefined();
  });

  it('should create Notification"', async () => {
    // arrange
    const content = { en: 'English Message', es: 'Spanish Message' };
    const input = new NotificationByDeviceBuilder()
      .setIncludePlayerIds(new Array(DEFAULT_DEVICE))
      .notification()
      .setContents(content)
      .setDelivery({
        send_after: tomorrow().toUTCString(),
      })
      .build();

    // act
    const result = await client.createNotification(input);
    const cancelInput = { id: result.id } as ICancelNotificationInput;
    const cancelResult = await client.cancelNotification(cancelInput);

    // assert
    expect(result).toBeDefined();
    expect(cancelResult.success).toBeTruthy();
  });

  it('should view Notification"', async () => {
    // arrange
    const content = { en: 'English Message', es: 'Spanish Message' };
    const createInput = new NotificationByDeviceBuilder()
      .setIncludePlayerIds(new Array(DEFAULT_DEVICE))
      .notification()
      .setContents(content)
      .setDelivery({
        send_after: tomorrow().toUTCString(),
      })
      .build();
    const createResult = await client.createNotification(createInput);
    const input = { id: createResult.id } as IViewNotificationInput;

    // act
    const result = await client.viewNotification(input);
    const cancelInput = { id: result.id } as ICancelNotificationInput;
    const cancelResult = await client.cancelNotification(cancelInput);

    // assert
    expect(result.id).toBeDefined();
    expect(cancelResult.success).toBeTruthy();
  });

  it('should cancel Notification"', async () => {
    // arrange
    const content = { en: 'English Message', es: 'Spanish Message' };
    const createInput = new NotificationByDeviceBuilder()
      .setIncludePlayerIds(new Array(DEFAULT_DEVICE))
      .notification()
      .setContents(content)
      .setDelivery({
        send_after: tomorrow().toUTCString(),
      })
      .build();
    const createResult = await client.createNotification(createInput);
    const input = { id: createResult.id } as ICancelNotificationInput;

    // act
    const result = await client.cancelNotification(input);

    // assert
    expect(result.success).toBeTruthy();
  });

  it('should create Device"', async () => {
    // arrange
    const input = {
      device_type: DeviceType.ChromeWebPush,
      identifier: 'test',
    } as ICreateDeviceInput;

    // act
    const result = await client.createDevice(input);

    // assert
    expect(result).toBeDefined();
  });

  it('should update Device"', async () => {
    // arrange
    const input = {
      id: DEFAULT_DEVICE,
      device_type: DeviceType.Android,
      identifier: 'test android',
    } as IUpdateDeviceInput;

    // act
    const result = await client.updateDevice(input);

    // assert
    expect(result).toBeDefined();
  });

  it('should view Device"', async () => {
    // arrange
    const input = { id: DEFAULT_DEVICE } as IViewDeviceInput;

    // act
    const result = await client.viewDevice(input);

    // assert
    expect(result).toBeDefined();
  });

  it('should view Devices"', async () => {
    // act
    const result = await client.viewDevices();

    // assert
    expect(result.total_count).toBeGreaterThan(0);
  });

  it('should new Session"', async () => {
    // arrange
    const input = { deviceId: DEFAULT_DEVICE } as INewSessionInput;

    // act
    const result = await client.newSession(input);

    // assert
    expect(result.success).toBeTruthy();
  });

  it('should track open"', async () => {
    // arrange
    const content = { en: 'English Message', es: 'Spanish Message' };
    const createInput = new NotificationByDeviceBuilder()
      .setIncludePlayerIds(new Array(DEFAULT_DEVICE))
      .notification()
      .setContents(content)
      .setDelivery({
        send_after: tomorrow().toUTCString(),
      })
      .build();
    const createResult = await client.createNotification(createInput);
    const cancelInput = { id: createResult.id } as ICancelNotificationInput;
    const input = { notificationId: createResult.id, opened: true } as ITrackOpenInput;

    // act
    const result = await client.trackOpen(input);
    const cancelResult = await client.cancelNotification(cancelInput);

    // assert
    expect(result.success).toBeTruthy();
    expect(cancelResult.success).toBeTruthy();
  });
});
