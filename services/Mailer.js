const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

sgMail.setApiKey(keys.sendgridKey);

class Mailer {
  constructor({ subject, recipients }, content) {
    this.fromEmail = 'noreply@feedbackfast.com';
    this.subject = subject;
    this.htmlBody = content;
    this.recipients = recipients;
  }

  formatEmails() {
    return this.recipients.map(recipientObj => recipientObj.email);
  }

  async send() {
    const msg = {
      to: this.formatEmails(),
      from: this.fromEmail,
      subject: this.subject,
      html: this.htmlBody,
    };
    const res = await sgMail.sendMultiple(msg);
    return res;
  }
}

module.exports = Mailer;
