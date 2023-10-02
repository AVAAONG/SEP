import { ImgurClient } from 'imgur';

const client = new ImgurClient({
  clientId: '<YOUR_CLIENT_ID>',
});

async function uploadImage(image: File): Promise<string> {
  const response = await client.upload({
    image,
    type: 'stream',
  });

  return response.data.link;
}

// Example usage:

const imageFile = new File(['<IMAGE_CONTENT>'], 'image.jpg');

const imageUrl = await uploadImage(imageFile);

console.log(imageUrl); // Output: https://i.imgur.com/1234567890.jpg
