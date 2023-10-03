'use server'
import { createTransport } from "nodemailer";

const sendEmailWithDevAccount = async (name: string, html: string, to: string) => {
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
        subject: `🌟¡Bienvenida al SEP, ${name}!`,
        html
    });
    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length) {
        throw new Error(`Email (${failed.join(', ')}) could not be sent`);
    }
    console.log(result);
}
export default sendEmailWithDevAccount;