import { OneSignalClient } from './oneSignalClient';
import { IViewNotificationsInput } from './dto/notifications/viewNotifications.input';
import { ICreateAppInput, IUpdateAppInput } from './dto/apps';
import { NotificationBySegmentBuilder } from './builders/notification';

// Test account to testdroiddevice001@gmail.com
const USER_AUTH_KEY = 'ZjI1Zjc2YWEtMDk2Mi00NDM2LTg4Y2UtNzAzNTY5ODQwZTcx';
const DEFAULT_REST_API_KEY = 'NWRhMDMyNjMtNjRmYS00M2UxLTllNmYtY2M1NzgxMTM1YzQ5';
const DEFAULT_APP_NAME = 'Test';
const DEFAULT_APP_ID = 'b264d4c5-2f49-40c0-b84a-3eb16c5a4340';

describe('client', () => {
  let client: OneSignalClient;

  beforeEach(() => {
    client = new OneSignalClient(DEFAULT_REST_API_KEY, USER_AUTH_KEY);
  });

  it('should get Apps"', async () => {
    // act
    const result = await client.viewApps();

    // assert
    expect(result.some(x => x.name === DEFAULT_APP_NAME)).toBeTruthy();
  });

  it('should get App"', async () => {
    // act
    const result = await client.viewApp({ appId: DEFAULT_APP_ID });

    // assert
    expect(result.name).toEqual(DEFAULT_APP_NAME);
  });

  it('should create App"', async () => {
    // arrange
    const name = 'Test2';
    const existsApps = await client.viewApps();
    if (existsApps.some(x => x.name === name)) {
      return;
    }
    const input = { name } as ICreateAppInput;

    // act
    const result = await client.createApp(input);

    // assert
    expect(result.name).toEqual(name);
  });

  it('should update App"', async () => {
    // arrange
    const existsApp = await client.viewApp({ appId: DEFAULT_APP_ID });
    const input = { id: existsApp.id, name: DEFAULT_APP_NAME } as IUpdateAppInput;

    // act
    const result = await client.updateApp(input);

    // assert
    expect(result.name).toEqual(DEFAULT_APP_NAME);
  });

  it('should view Notifications"', async () => {
    // arrange
    const input = { app_id: DEFAULT_APP_ID, limit: 10, offset: 10 } as IViewNotificationsInput;

    // act
    const result = await client.viewNotifications(input);

    // assert
    expect(result).toBeDefined();
  });

  it('should create Notification"', async () => {
    // arrange
    const content = { en: 'English Message', es: 'Spanish Message' };
    const notification = new NotificationBySegmentBuilder(DEFAULT_APP_ID)
      .setIncludedSegments(['Inactive Users'])
      .notification()
      .setContents(content)
      .build();

    // act
    const result = await client.createNotification(notification);

    // assert
    expect(result).toBeDefined();
  });
});
