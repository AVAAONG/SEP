import { gmail_v1 } from '@googleapis/gmail';
import { Gmail } from '../auth/auth';

const sendEmail = async () => {
  const message = {
    to: 'RECIPIENT_EMAIL_ADDRESS',
    subject: 'EMAIL_SUBJECT',
    text: 'EMAIL_CONTENT',
  };

  await Gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: Buffer.from(
        `To: ${message.to}\nSubject: ${message.subject}\n\n${message.text}`,
        'utf-8'
      ).toString('base64'),
    },
  });
};
