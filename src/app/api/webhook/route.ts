import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Verify the webhook signature
  const signature = req.headers['x-goog-signature'] as string;
  const hash = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(req.body)
    .digest('base64');
  if (signature !== hash) {
    res.status(401).send('Invalid signature');
    return;
  } else {
    // Process the push notification from the Google Forms API
    const notification = JSON.parse(req.body);
    console.log(notification);

    // Send a response to acknowledge receipt of the notification
    res.status(200).send('OK');
  }
};

export default handler;
