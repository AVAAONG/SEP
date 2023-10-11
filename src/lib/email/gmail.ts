'use server';
import { Gmail, setTokens } from '@/lib/googleAPI/auth';
import { useSession } from 'next-auth/react';

const sendEmail = async (
  to: string,
  sender: string,
  subject: string,
  text: string,
  html: string
) => {
  const session = useSession();
  setTokens(session.data?.accessToken as string, session.data?.refreshToken as string);
  const message = [
    'Content-Type: multipart/alternative; boundary="foo_bar_baz"\r\n',
    'MIME-Version: 1.0\r\n',
    `To: ${to}\r\n`,
    `From: ${sender}\r\n`,
    `Subject: ${subject}\r\n\r\n`,
    '--foo_bar_baz\r\n',
    'Content-Type: text/plain; charset="UTF-8"\r\n',
    'Content-Transfer-Encoding: 7bit\r\n\r\n',
    `${text}\r\n\r\n`,
    '--foo_bar_baz\r\n',
    'Content-Type: text/html; charset="UTF-8"\r\n',
    'Content-Transfer-Encoding: quoted-printable\r\n\r\n',
    `${html}\r\n\r\n`,
    '--foo_bar_baz--\r\n',
  ].join('');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  await Gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });
};

export default sendEmail;
