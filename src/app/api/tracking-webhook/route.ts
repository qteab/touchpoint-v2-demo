import { createHmac, timingSafeEqual } from 'crypto';

export async function POST(request: Request) {
  if (!process.env.DHL_WEBHOOK_SECRET) {
    throw new Error('Missing environment variable');
  }

  const clonedRequest = request.clone();
  const rawBody = await request.text();

  const data = await clonedRequest.json();

  console.log('Recieved tracking data from DHL', data);

  const dhlSignature = request.headers.get('x-dhl-hmac-sha256');

  const valid = validateHMACSignature(
    dhlSignature,
    rawBody,
    process.env.DHL_WEBHOOK_SECRET
  );

  console.log('HMAC is valid', valid);

  return new Response('OK', { status: 200 });
}

const validateHMACSignature = (
  receivedSignature: string | null,
  rawBody: string,
  secret: string
): boolean => {
  if (!receivedSignature || typeof receivedSignature !== 'string') {
    return false;
  }

  const hmac = createHmac('sha256', secret);
  hmac.update(rawBody);
  const expectedSignature = hmac.digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const receivedBuffer = Buffer.from(receivedSignature, 'hex');

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(
    new Uint8Array(expectedBuffer),
    new Uint8Array(receivedBuffer)
  );
};
