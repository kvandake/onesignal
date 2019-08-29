import { OneSignalError } from '../../errors';
import { EmailBuilder } from './email.builder';
import { INotification } from '../../dto/notifications';

describe('EmailBuilder', () => {
  let builder: EmailBuilder;

  beforeEach(() => {
    builder = new EmailBuilder({} as INotification);
  });

  it('should valid variables', () => {
    // arrange
    const emailBody = 'emailBody';
    const emailSubject = 'emailSubject';
    const emailFromName = 'emailFromName';
    const emailFromAddress = 'emailFromAddress';
    const templateId = 'templateId';

    // act
    builder.setEmailBody(emailBody);
    builder.setEmailSubject(emailSubject);
    builder.setEmailFromName(emailFromName);
    builder.setEmailFromAddress(emailFromAddress);
    builder.setTemplateId(templateId);
    const result = builder.build();

    // assert
    expect(result.email_body).toEqual(emailBody);
    expect(result.email_subject).toEqual(emailSubject);
    expect(result.email_from_name).toEqual(emailFromName);
    expect(result.email_from_address).toEqual(emailFromAddress);
  });

  it('should check required variables', () => {
    // act & assert
    expect(() => builder.setEmailSubject('subject').build()).toThrowError(OneSignalError);
  });
});
