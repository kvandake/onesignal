import { OneSignalAppClient } from './oneSignalAppClient';
import MockAdapter from 'axios-mock-adapter';
import {
  ICancelNotificationInput,
  INotification,
  IViewNotificationInput,
  IViewNotificationsInput,
} from './dto/notifications';
import { viewNotificationResultFaker } from '../__tests__/fakers/viewNotification.result.faker';
import { viewNotificationsResultFaker } from '../__tests__/fakers/viewNotifications.result.faker';
import { createNotificationResultFaker } from '../__tests__/fakers/createNotification.result.faker';
import { cancelNotificationResultFaker } from '../__tests__/fakers/cancelNotification.result.faker';
import { ICreateDeviceInput, IUpdateDeviceInput, IViewDeviceInput } from './dto/devices';
import { DeviceType } from './enums';
import { createDeviceResultFaker } from '../__tests__/fakers/createDevice.result';
import { viewDeviceResultFaker } from '../__tests__/fakers/viewDevice.result.faker';
import { viewDevicesResultFaker } from '../__tests__/fakers/viewDevices.result.faker';
import { updateDeviceResultFaker } from '../__tests__/fakers/updateDevice.result';

describe('OneSignalAppClient', () => {
  let client: OneSignalAppClient;
  let mock: MockAdapter;
  const appId: string = 'appId';

  beforeEach(() => {
    client = new OneSignalAppClient(appId, 'test');
    mock = new MockAdapter(client.httpClient);
  });

  it('should view Notification"', async () => {
    // arrange
    const input = { id: '1' } as IViewNotificationInput;
    const response = viewNotificationResultFaker.create();
    mock.onGet(`/notifications/${input.id}?app_id=${appId}`).reply(200, response);

    // act
    const result = await client.viewNotification(input);

    // assert
    expect(result).toBeDefined();
    expect(result.id).toEqual(input.id);
  });

  it('should view Notifications"', async () => {
    // arrange
    const input = { limit: 10, offset: 10, kind: 1 } as IViewNotificationsInput;
    const response = viewNotificationsResultFaker.create();
    mock.onGet(
      `/notifications?app_id=${appId}&limit=${input.limit}&offset=${input.offset}&kind=${input.kind}`,
    ).reply(200, response);

    // act
    const result = await client.viewNotifications(input);

    // assert
    expect(result).toBeDefined();
    expect(result.limit).toBeDefined();
  });

  it('should create Notification"', async () => {
    // arrange
    const input = {} as INotification;
    const response = createNotificationResultFaker.create();
    mock.onPost(`/notifications`).reply(200, response);

    // act
    const result = await client.createNotification(input);

    // assert
    expect(result.id).toBeDefined();
    expect(result.recipients).toBeDefined();
  });

  it('should cancel Notification"', async () => {
    // arrange
    const input = { id: '12' } as ICancelNotificationInput;
    const response = cancelNotificationResultFaker.create();
    mock.onDelete(`/notifications/${input.id}?app_id=${appId}`).reply(200, response);

    // act
    const result = await client.cancelNotification(input);

    // assert
    expect(result.success).toBeTruthy();
  });

  it('should create Device"', async () => {
    // arrange
    const input = { device_type: DeviceType.Amazon } as ICreateDeviceInput;
    const response = createDeviceResultFaker.create();
    mock.onPost(`/players`).reply(200, response);

    // act
    const result = await client.createDevice(input);

    // assert
    expect(result.success).toBeTruthy();
  });

  it('should update Device"', async () => {
    // arrange
    const id = '1';
    const input = { id, device_type: DeviceType.Amazon } as IUpdateDeviceInput;
    const response = updateDeviceResultFaker.create();
    mock.onPut(`/players/${id}`).reply(200, response);

    // act
    const result = await client.updateDevice(input);

    // assert
    expect(result.success).toBeTruthy();
  });

  it('should view Device"', async () => {
    // arrange
    const id = '1';
    const input = { id } as IViewDeviceInput;
    const response = viewDeviceResultFaker.create();
    mock.onGet(`/players/${id}?app_id=${appId}`).reply(200, response);

    // act
    const result = await client.viewDevice(input);

    // assert
    expect(result).toBeDefined();
  });

  it('should view Devices"', async () => {
    // arrange
    const response = viewDevicesResultFaker.create();
    mock.onGet(`/players?app_id=${appId}`).reply(200, response);

    // act
    const result = await client.viewDevices();

    // assert
    expect(result).toBeDefined();
  });
});
