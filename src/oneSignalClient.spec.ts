import { OneSignalClient } from './oneSignalClient';
import { appFaker } from '../__tests__/fakers/app.faker';
import { upsertAppInputFaker } from '../__tests__/fakers/upsertAppInput.faker';
import MockAdapter from 'axios-mock-adapter';

describe('client', () => {
  let client: OneSignalClient;
  let mock: MockAdapter;

  beforeEach(() => {
    client = new OneSignalClient('test');
    mock = new MockAdapter(client.httpClient);
  });

  it('should get Apps"', async () => {
    // arrange
    const response = appFaker.create();
    mock.onGet('/apps').reply(200, [response]);

    // act
    const result = await client.getApps();

    // assert
    expect(result[0].name).toBeDefined();
    expect(result[0].apns_certificates).toBeDefined();
  });

  it('should get App"', async () => {
    // arrange
    const response = appFaker.create();
    const appId = response.id;
    mock.onGet(`/apps/${appId}`).reply(200, response);

    // act
    const result = await client.getApp(appId);

    // assert
    expect(result.name).toBeDefined();
    expect(result.apns_certificates).toBeDefined();
  });

  it('should create App"', async () => {
    // arrange
    const input = upsertAppInputFaker.create();
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
    const input = upsertAppInputFaker.create();
    const response = appFaker.create();
    const appId = response.id;
    mock.onPut(`/apps/${appId}`).reply(200, response);

    // act
    const result = await client.updateApp(appId, input);

    // assert
    expect(result.name).toBeDefined();
    expect(result.apns_certificates).toBeDefined();
  });
});
