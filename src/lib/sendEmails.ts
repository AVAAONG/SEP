'use server';
import { Gender } from '@prisma/client';
import { createTransport } from 'nodemailer';
import { getOnlyCaracasScholar } from './db/utils/users';

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

export const sendGenericEmail = async (htmlMessage: string, to: string, subject: string) => {
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
    subject,
    html: htmlMessage,
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email (${failed.join(', ')}) could not be sent`);
  }
};


function chunkArray(array: any[], chunkSize: number): any[][] {
  let index = 0;
  let arrayLength = array.length;
  let tempArray = [];

  for (index = 0; index < arrayLength; index += chunkSize) {
    let chunk = array.slice(index, index + chunkSize);
    tempArray.push(chunk);
  }
  return tempArray;
}


export const sendActivitiesEmail = async (htmlMessage: string, subject: string) => {
  const scholars = await getOnlyCaracasScholar()
  const emails = scholars.map(scholar => scholar.email)

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
  const chunks = chunkArray(emails, 100); // Split the recipients into chunks of 100

  for (const chunk of chunks) {
    const result = await transport.sendMail({
      bcc: chunk, // Send to a chunk of recipients
      from: 'ProExcelencia <avaatecnologia@gmail.com>',
      subject,
      to: 'programa.proexcelencia@gmail.com',
      html: htmlMessage,
    });
    const failed = result.rejected.concat(result.pending).filter(Boolean);
    // if (failed.length) {
    //   throw new Error(`Email (${failed.join(', ')}) could not be sent`);
    // }
  }
}