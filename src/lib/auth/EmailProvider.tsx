import type { Awaitable } from 'next-auth/src';
import type { Theme } from 'next-auth/src/core/types';
import type { CommonProviderOptions } from 'next-auth/src/providers';
import { Transport, TransportOptions, createTransport } from 'nodemailer';
import * as JSONTransport from 'nodemailer/lib/json-transport/index.js';
import * as SendmailTransport from 'nodemailer/lib/sendmail-transport/index.js';
import * as SESTransport from 'nodemailer/lib/ses-transport/index.js';
import * as SMTPPool from 'nodemailer/lib/smtp-pool/index.js';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
import * as StreamTransport from 'nodemailer/lib/stream-transport/index.js';
import createConfirmMessage from './ConfirmEmailMessage';

type AllTransportOptions =
  | string
  | SMTPTransport
  | SMTPTransport.Options
  | SMTPPool
  | SMTPPool.Options
  | SendmailTransport
  | SendmailTransport.Options
  | StreamTransport
  | StreamTransport.Options
  | JSONTransport
  | JSONTransport.Options
  | SESTransport
  | SESTransport.Options
  | Transport<any>
  | TransportOptions;

export interface SendVerificationRequestParams {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  token: string;
  theme: Theme;
}

export interface EmailUserConfig {
  server?: AllTransportOptions;
  type?: 'email';
  /** @default "NextAuth <no-reply@example.com>" */
  from?: string;
  /**
   * How long until the e-mail can be used to log the user in,
   * in seconds. Defaults to 1 day
   * @default 86400
   */
  maxAge?: number;
  /** [Documentation](https://next-auth.js.org/providers/email#customizing-emails) */
  sendVerificationRequest?: (params: SendVerificationRequestParams) => Awaitable<void>;
  /**
   * By default, we are generating a random verification token.
   * You can make it predictable or modify it as you like with this method.
   * @example
   * ```js
   *  Providers.Email({
   *    async generateVerificationToken() {
   *      return "ABC123"
   *    }
   *  })
   * ```
   * [Documentation](https://next-auth.js.org/providers/email#customizing-the-verification-token)
   */
  generateVerificationToken?: () => Awaitable<string>;
  /** If defined, it is used to hash the verification token when saving to the database . */
  secret?: string;
  /**
   * Normalizes the user input before sending the verification request.
   *
   * ⚠️ Always make sure this method returns a single email address.
   *
   * @note Technically, the part of the email address local mailbox element
   * (everything before the `@` symbol) should be treated as 'case sensitive'
   * according to RFC 2821, but in practice this causes more problems than
   * it solves, e.g.: when looking up users by e-mail from databases.
   * By default, we treat email addresses as all lower case,
   * but you can override this function to change this behavior.
   *
   * [Documentation](https://next-auth.js.org/providers/email#normalizing-the-e-mail-address) | [RFC 2821](https://tools.ietf.org/html/rfc2821) | [Email syntax](https://en.wikipedia.org/wiki/Email_address#Syntax)
   */
  normalizeIdentifier?: (identifier: string) => string;
}

export interface EmailConfig extends CommonProviderOptions {
  // defaults
  id: 'email';
  type: 'email';
  name: 'Email';
  server: AllTransportOptions;
  from: string;
  maxAge: number;
  sendVerificationRequest: (params: SendVerificationRequestParams) => Awaitable<void>;

  /**
   * This is copied into EmailConfig in parseProviders() don't use elsewhere
   */
  options: EmailUserConfig;

  // user options
  // TODO figure out a better way than copying from EmailUserConfig
  secret?: string;
  generateVerificationToken?: () => Awaitable<string>;
  normalizeIdentifier?: (identifier: string) => string;
}

export type EmailProvider = (options: EmailUserConfig) => EmailConfig;

export type EmailProviderType = 'Email';

export default function CustomEmailProvider(): EmailConfig {
  return {
    id: 'email',
    type: 'email',
    name: 'Email',
    // Server can be an SMTP connection string or a nodemailer config object
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    // from: process.env.EMAIL_FROM,
    from: 'ProExcelencia <avaatecnologia@gmail.com>',
    maxAge: 24 * 60 * 60,
    async sendVerificationRequest(params) {
      const { identifier, url, theme } = params;
      const { host } = new URL(url);
      const transport = createTransport({
        service: 'gmail',
        auth: {
          user: 'avaatecnologia@gmail.com',
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const result = await transport.sendMail({
        to: identifier,
        from: 'ProExcelencia <avaatecnologia@gmail.com>',
        subject: `🔑 Enlace seguro de inicio de sesión para el SEP`,
        text: text({ url, host }),
        html: createConfirmMessage(url, identifier, host),
      });
      const failed = result.rejected.concat(result.pending).filter(Boolean);
      if (failed.length) {
        throw new Error(`Email (${failed.join(', ')}) could not be sent`);
      }
    },
    options: {
      type: 'email',
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    },
  };
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Entra al SEP 👉 ${host}\n${url}\n\n`;
}
