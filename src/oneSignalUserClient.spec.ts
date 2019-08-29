import { appResultFaker } from '../__tests__/fakers/app.result.faker';
import MockAdapter from 'axios-mock-adapter';
import { ICreateAppInput, IUpdateAppInput, IViewAppInput } from './dto/apps';
import { OneSignalUserClient } from './oneSignalUserClient';

describe('OneSignalUserClient', () => {
  let client: OneSignalUserClient;
  let mock: MockAdapter;
  const appId: string = 'appId';

  beforeEach(() => {
    client = new OneSignalUserClient('test');
    mock = new MockAdapter(client.httpClient);
  });

  it('should get Apps"', async () => {
    // arrange

    const response = appResultFaker.create();
    mock.onGet('/apps').reply(200, [response]);

    // act
    const result = await client.viewApps();

    // assert
    expect(result[0].name).toBeDefined();
    expect(result[0].apns_certificates).toBeDefined();
  });

  it('should get App"', async () => {
    // arrange
    const input = { id: appId } as IViewAppInput;
    const response = appResultFaker.create();
    mock.onGet(`/apps/${appId}`).reply(200, response);

    // act
    const result = await client.viewApp(input);

    // assert
    expect(result.name).toBeDefined();
    expect(result.apns_certificates).toBeDefined();
  });

  it('should create App"', async () => {
    // arrange
    const input = { name: 'test' } as ICreateAppInput;
    const response = appResultFaker.create();
    mock.onPost('/apps').reply(200, response);

    // act
    const result = await client.createApp(input);

    // assert
    expect(result.name).toBeDefined();
    expect(result.apns_certificates).toBeDefined();
  });

  it('should update App"', async () => {
    // arrange
    const input = { name: 'test', id: appId } as IUpdateAppInput;
    const response = appResultFaker.create();
    mock.onPut(`/apps/${appId}`).reply(200, response);

    // act
    const result = await client.updateApp(input);

    // assert
    expect(result.name).toBeDefined();
    expect(result.apns_certificates).toBeDefined();
  });
});
