import { EncryptJWT } from "jose";
import { NextResponse } from "next/server";
import { decode as base64Decode } from "base64-arraybuffer";

const MAX_VERIFY_ATTEMPTS = 5;
const VERIFY_ATTEMPT_WINDOW = 10 * 60 * 1000; // 10 minutes

globalThis.verifyAttempts = globalThis.verifyAttempts || {};

export async function POST(req) {
  const { otp, email } = await req.json();
  const store = globalThis.otpStore || {};
  const currentTime = Date.now();

  // Cleanup expired OTPs
  for (const key in store) {
    if (store[key].expireAT < currentTime) {
      delete store[key];
    }
  }

  const otpData = store[email];

  // Track verify attempts per email
  const attempts = globalThis.verifyAttempts[email] || [];
  // Remove old attempts outside the window
  const recentAttempts = attempts.filter(ts => currentTime - ts < VERIFY_ATTEMPT_WINDOW);

  if (recentAttempts.length >= MAX_VERIFY_ATTEMPTS) {
    return Response.json({ success: false, error: 'Too many verification attempts. Please try again later.' }, { status: 429 });
  }

  // Record this attempt
  recentAttempts.push(currentTime);
  globalThis.verifyAttempts[email] = recentAttempts;

  if (!otpData || !otp || !email || currentTime > otpData.expireAT || otpData.otp !== otp) {
    return Response.json({ success: false, error: 'Invalid or Expired OTP' }, { status: 400 });
  }


  // OTP is valid
  delete store[email];
  delete globalThis.verifyAttempts[email]; // Reset attempts on success

  // 🔐 Create Encrypted JWT
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 days
  const secret = new Uint8Array(base64Decode(process.env.JWT_SECRET));


  const token = await new EncryptJWT({ email, iat, exp })
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .encrypt(secret);


  const response = NextResponse.json({ success: true, message: 'OTP verified successfully' });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return response;
}
