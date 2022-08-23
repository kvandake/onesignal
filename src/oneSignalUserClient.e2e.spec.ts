import { ICreateAppInput, IUpdateAppInput, IViewAppInput } from './dto/apps';
import { OneSignalUserClient } from './oneSignalUserClient';
// @ts-ignore
import { testConstants } from '../__tests__/testConstants';

describe('OneSignalUserClient', () => {
  let client: OneSignalUserClient;

  beforeEach(() => {
    client = new OneSignalUserClient(testConstants.userAuthKey);
  });

  it(
    'should get Apps"',
    async () => {
      // act
      const result = await client.viewApps();

      // assert
      expect(result.some((x) => x.name === testConstants.defaultApp.name)).toBeTruthy();
    },
    testConstants.defaultTimeout,
  );

  it(
    'should get App"',
    async () => {
      // arrange
      const input = { id: testConstants.defaultApp.id } as IViewAppInput;

      // act
      const result = await client.viewApp(input);

      // assert
      expect(result.name).toEqual(testConstants.defaultApp.name);
    },
    testConstants.defaultTimeout,
  );

  it(
    'should create App"',
    async () => {
      // arrange
      const name = 'Test2';
      const existsApps = await client.viewApps();
      if (existsApps.some((x) => x.name === name)) {
        return;
      }
      const input = { name } as ICreateAppInput;

      // act
      const result = await client.createApp(input);

      // assert
      expect(result.name).toEqual(name);
    },
    testConstants.defaultTimeout,
  );

  it(
    'should update App"',
    async () => {
      // arrange
      const viewInput = { id: testConstants.defaultApp.id } as IViewAppInput;
      const existsApp = await client.viewApp(viewInput);
      const input = { id: existsApp.id, name: testConstants.defaultApp.name } as IUpdateAppInput;

      // act
      const result = await client.updateApp(input);

      // assert
      expect(result.name).toEqual(testConstants.defaultApp.name);
    },
    testConstants.defaultTimeout,
  );
});
