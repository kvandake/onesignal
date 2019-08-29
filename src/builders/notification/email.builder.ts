import { INotification } from '../../dto/notifications';
import { OneSignalError } from '../../errors';

//  https://documentation.onesignal.com/reference#section-email-content
export class EmailBuilder {
  constructor(private readonly notification: INotification) {}

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

  //  Use a template you setup on our dashboard. You can override the template values by sending other parameters with the request.
  //  The template_id is the UUID found in the URL when viewing a template on our dashboard.
  //  Example: be4a8044-bbd6-11e4-a581-000c2940e62c
  public setTemplateId(value: string): EmailBuilder {
    this.notification.template_id = value;
    return this;
  }

  private checkRequiredVariables() {
    if (!this.notification.email_subject) {
      throw new OneSignalError('email_subject is required');
    }
    if (!this.notification.email_body && !this.notification.template_id) {
      throw new OneSignalError('email_body or template_id are required');
    }
  }
}
