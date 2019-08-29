import { NotificationByFilterBuilder } from './notificationByFilter.builder';

describe('NotificationByFilterBuilder', () => {
  let builder: NotificationByFilterBuilder;

  beforeEach(() => {
    builder = new NotificationByFilterBuilder('test');
  });

  it('should valid variables', () => {
    // arrange
    const firstSession = 'firstSession';
    const lastSession = 'lastSession';
    const amountSpent = 'amountSpent';
    const appVersion = 'appVersion';
    const country = 'country';
    const email = 'email';
    const boughtSku = 'boughtSku';
    const location = 'location';
    const sessionCount = 'sessionCount';
    const sessionTime = 'sessionTime';
    const tag = 'tag';
    const language = 'language';

    // act
    builder.setFirstSession(firstSession);
    builder.setLastSession(lastSession);
    builder.setAmountSpent(amountSpent);
    builder.setAppVersion(appVersion);
    builder.setCountry(country);
    builder.setEmail(email);
    builder.setBoughtSku(boughtSku);
    builder.setLocation(location);
    builder.setSessionCount(sessionCount);
    builder.setSessionTime(sessionTime);
    builder.setTag(tag);
    builder.setLanguage(language);
    const result = builder.notification().setContents({ test: 1 }).build();

    // assert
    expect(result.first_session).toEqual(firstSession);
    expect(result.last_session).toEqual(lastSession);
    expect(result.amount_spent).toEqual(amountSpent);
    expect(result.app_version).toEqual(appVersion);
    expect(result.country).toEqual(country);
    expect(result.email).toEqual(email);
    expect(result.bought_sku).toEqual(boughtSku);
    expect(result.location).toEqual(location);
    expect(result.session_count).toEqual(sessionCount);
    expect(result.session_time).toEqual(sessionTime);
    expect(result.tag).toEqual(tag);
    expect(result.language).toEqual(language);
  });

  it('should check required variables', () => {
    // act & assert
    // without required variables
    builder.notification().setContents({ test: 1 }).build();
  });
});
