'use client';
import { Buffer } from 'buffer';

export const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID!;

/**
 * Uploads an image to Imgur.
 *
 * @param image The image to upload.
 * @returns The Imgur link to the uploaded image.
 * @example
```typescript
const image = new File(["image data"], "image.png");
const imgurLink = await uploadToImgur(image);
```
 */
export const uploadImageToImgur = async (image: File): Promise<string> => {
  console.log(IMGUR_CLIENT_ID);
  const imageBuffer = await image.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString('base64');

  const response = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: `Client-ID 3e335264db5d41e`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: base64Image,
    }),
  });

  if (response.status !== 200) {
    throw new Error(`Failed to upload image to Imgur: ${response.status}`);
  }

  const data = await response.json();
  return data.data.link;
};
