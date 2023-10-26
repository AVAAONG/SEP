'use server';
import { Gender } from '@prisma/client';
import { createTransport } from 'nodemailer';

const sendEmailWithDevAccount = async (name: string, html: string, to: string, gender: Gender) => {
  const welcome = gender === 'F' ? 'Bienvenida' : 'Bienvenido';
  const transport = createTransport({
    service: 'gmail',
    auth: {
      user: 'avaatecnologia@gmail.com',
      pass: 'cfkrwmcaslabwukf',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const result = await transport.sendMail({
    to,
    from: 'ProExcelencia <avaatecnologia@gmail.com>',
    subject: `🌟 ¡${welcome} al SEP, ${name}!`,
    html,
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email (${failed.join(', ')}) could not be sent`);
  }
};
export default sendEmailWithDevAccount;
