import { OneSignalClient } from './oneSignalClient';
import { appFaker } from '../__tests__/fakers/app.faker';
import MockAdapter from 'axios-mock-adapter';
import { viewNotificationFaker } from '../__tests__/fakers/viewNotification.faker';
import { ICancelNotificationInput, INotification, IViewNotificationInput } from './dto/notifications';
import { IViewNotificationsInput } from './dto/notifications/viewNotifications.input';
import { viewNotificationsFaker } from '../__tests__/fakers/viewNotifications.faker';
import { createNotificationResultFaker } from '../__tests__/fakers/createNotification.result.faker';
import { cancelNotificationResultFaker } from '../__tests__/fakers/cancelNotification.result.faker';
import { ICreateAppInput, IUpdateAppInput } from './dto/apps';

describe('client', () => {
  let client: OneSignalClient;
  let mock: MockAdapter;
  const appId: string = 'appId';

  beforeEach(() => {
    client = new OneSignalClient('test', 'test');
  });

  it('should get Apps"', async () => {
    // arrange
    mock = new MockAdapter(client.userAuthClient);
    const response = appFaker.create();
    mock.onGet('/apps').reply(200, [response]);

    // act
    const result = await client.viewApps();

    // assert
    expect(result[0].name).toBeDefined();
    expect(result[0].apns_certificates).toBeDefined();
  });

  it('should get App"', async () => {
    // arrange
    mock = new MockAdapter(client.userAuthClient);
    const response = appFaker.create();
    mock.onGet(`/apps/${appId}`).reply(200, response);

    // act
    const result = await client.viewApp({ appId });

    // assert
    expect(result.name).toBeDefined();
    expect(result.apns_certificates).toBeDefined();
  });

  it('should create App"', async () => {
    // arrange
    mock = new MockAdapter(client.userAuthClient);
    const input = { name: 'test' } as ICreateAppInput;
    const response = appFaker.create();
    mock.onPost('/apps').reply(200, response);

    // act
    const result = await client.createApp(input);

    // assert
    expect(result.name).toBeDefined();
    expect(result.apns_certificates).toBeDefined();
  });

  it('should update App"', async () => {
    // arrange
    mock = new MockAdapter(client.userAuthClient);
    const input = { name: 'test', id: appId } as IUpdateAppInput;
    const response = appFaker.create();
    mock.onPut(`/apps/${appId}`).reply(200, response);

    // act
    const result = await client.updateApp(input);

    // assert
    expect(result.name).toBeDefined();
    expect(result.apns_certificates).toBeDefined();
  });

  it('should view Notification"', async () => {
    // arrange
    mock = new MockAdapter(client.restApiClient);
    const input = { app_id: appId, id: '1' } as IViewNotificationInput;
    const response = viewNotificationFaker.create();
    mock.onGet(`/notifications/${input.id}?app_id=${appId}`).reply(200, response);

    // act
    const result = await client.viewNotification(input);

    // assert
    expect(result).toBeDefined();
    expect(result.id).toEqual(input.id);
  });

  it('should view Notifications"', async () => {
    // arrange
    mock = new MockAdapter(client.restApiClient);
    const input = { app_id: appId, limit: 10, offset: 10, kind: 1 } as IViewNotificationsInput;
    const response = viewNotificationsFaker.create();
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
    mock = new MockAdapter(client.restApiClient);
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
    mock = new MockAdapter(client.restApiClient);
    const input = { app_id: appId, id: '12' } as ICancelNotificationInput;
    const response = cancelNotificationResultFaker.create();
    mock.onDelete(`/notifications/${input.id}?app_id=${appId}`).reply(200, response);

    // act
    const result = await client.cancelNotification(input);

    // assert
    expect(result.success).toBeTruthy();
  });
});
