// Install the library first: npm install --save qrcode

import * as QRCode from 'qrcode';

/**
 * Generates a QR code from the input string.
 * @param inputText The text to encode into the QR code.
 * @param outputPath Optional path to save the QR code image (e.g., 'output.png').
 * @param errorCorrectionLevel Optional error correction level ('L', 'M', 'Q', or 'H').
 * @param width Optional image width in pixels.
 * @param scale Optional scale factor.
 */
async function generateQRCode(inputText: string) {
  try {
    const qrDataURL = await QRCode.toDataURL(inputText, {
      margin: 1,
      width: 300,
      errorCorrectionLevel: 'H',
    });
    return qrDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

export default generateQRCode;
