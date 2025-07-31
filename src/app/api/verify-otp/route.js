import { EncryptJWT } from "jose";
import { NextResponse } from "next/server";
import { decode as base64Decode } from "base64-arraybuffer";
import { Redis } from '@upstash/redis';
import { redirect } from "next/dist/server/api-utils";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

const MAX_VERIFY_ATTEMPTS = 5;
const VERIFY_ATTEMPT_WINDOW = 10 * 60 * 1000; // 10 minutes

export async function POST(req) {
  const { otp, email } = await req.json();
  const currentTime = Date.now();



  // Get OTP data from Redis
  const otpData = await redis.get(`otp:${email}`);


  // Track verify attempts in Redis
  const attemptsKey = `attempts:${email}`;
  const attempts = await redis.get(attemptsKey) || [];

  // Remove old attempts outside the window
  const recentAttempts = attempts.filter(ts => currentTime - ts < VERIFY_ATTEMPT_WINDOW);

  if (recentAttempts.length >= MAX_VERIFY_ATTEMPTS) {
    return Response.json({ success: false, error: 'Too many verification attempts. Please try again later.' }, { status: 429 });
  }

  // Record this attempt
  recentAttempts.push(currentTime);
  await redis.setex(attemptsKey, 600, recentAttempts); // 10 minutes TTL

  // Validation logic
  if (!otpData) {
    return Response.json({ success: false, error: 'Invalid or Expired OTP' }, { status: 400 });
  }

  if (!otp || !email) {
    return Response.json({ success: false, error: 'Invalid or Expired OTP' }, { status: 400 });
  }

  if (currentTime > otpData.expireAT) {
    // Clean up expired OTP
    await redis.del(`otp:${email}`);
    return Response.json({ success: false, error: 'Invalid or Expired OTP' }, { status: 400 });
  }

  if (otpData.otp !== otp) {
    return Response.json({ success: false, error: 'Invalid or Expired OTP' }, { status: 400 });
  }

  // OTP is valid - clean up from Redis
  await redis.del(`otp:${email}`);
  await redis.del(attemptsKey); // Reset attempts on success

  // Create Encrypted JWT
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 days
  const secret = new Uint8Array(base64Decode(process.env.JWT_SECRET));

  const token = await new EncryptJWT({ email, iat, exp })
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .encrypt(secret);

  const response = NextResponse.json({ 
    success: true, 
    message: 'OTP verified successfully',
    redirect: '/learning'
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return response;
}