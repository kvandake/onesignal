import { INotification } from '../../dto/notifications';
import { OneSignalError } from '../../errors';

//  https://documentation.onesignal.com/reference#section-email-content
export class EmailBuilder {

  constructor(
    private readonly notification: INotification,
  ) {

  }

  public build(): INotification {
    this.checkRequiredVariables();
    return this.notification;
  }

  //  The subject of the email.
  public setEmailSubject(value: string): EmailBuilder {
    this.notification.email_subject = value;
    return this;
  }

  //  The body of the email you wish to send. Typically, customers include their own HTML templates here. Must include [unsubscribe_url]
  //  in an <a> tag somewhere in the email.
  // Note: any malformed HTML content will be sent to users. Please double-check your HTML is valid.
  public setEmailBody(value: string): EmailBuilder {
    this.notification.email_body = value;
    return this;
  }

  //  The name the email is from. If this is not specified, this will use your default from name set in Email Setup.
  public setEmailFromName(value: string): EmailBuilder {
    this.notification.email_from_name = value;
    return this;
  }

  //  The email address the email is from. If this is not specified, this will use your default from email in Email Setup.
  public setEmailFromAddress(value: string): EmailBuilder {
    this.notification.email_from_address = value;
    return this;
  }

  private checkRequiredVariables() {
    if (!this.notification.email_subject || !this.notification.email_body) {
      throw new OneSignalError('email_subject and email_body are required');
    }
  }
}
