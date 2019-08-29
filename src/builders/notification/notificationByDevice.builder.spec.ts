import { NotificationByDeviceBuilder } from './notificationByDevice.builder';
import { OneSignalError } from '../../errors';

describe('NotificationByDeviceBuilder', () => {
  let builder: NotificationByDeviceBuilder;

  beforeEach(() => {
    builder = new NotificationByDeviceBuilder('test');
  });

  it('should valid variables', () => {
    // arrange
    const emailTokens = ['token1', 'token2'];
    const externalIds = ['id1', 'id2'];
    const playerIds = ['player1', 'player2'];

    // act
    builder.setIncludeEmailTokens(emailTokens);
    builder.setIncludeExternalUserIds(externalIds);
    builder.setIncludePlayerIds(playerIds);
    const result = builder.notification().setContents({ test: 1 }).build();

    // assert
    expect(result.include_email_tokens).toEqual(emailTokens);
    expect(result.include_external_user_ids).toEqual(externalIds);
    expect(result.include_player_ids).toEqual(playerIds);
  });

  it('should check required variables', () => {
    // act & assert
    expect(() => builder.notification().setContents({ test: 1 }).build()).toThrowError(OneSignalError);
  });
});
