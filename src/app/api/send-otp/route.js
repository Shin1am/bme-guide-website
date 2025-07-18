import nodemailer from 'nodemailer';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

const MAX_REQUESTS = 5;
const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes

export async function POST(req) {
  const { email } = await req.json();
  const currentTime = Date.now();


  if (!email || !email.endsWith('@student.mahidol.edu')) {
    return Response.json({ success: false, error: 'Invalid university email' }, { status: 400 });
  }

  const existingOtp = await redis.get(`otp:${email}`);
  let otpExists =  existingOtp || null;

    // Check if OTP exists in Redis
    if (otpExists) {
        if (otpExists.expireAT < currentTime) {
            await redis.del(`otp:${email}`);
            otpExists = null;
        }
    }


  if (otpExists && otpExists.count >= MAX_REQUESTS) {
    return Response.json({ success: false, error: 'Too many OTP requests. Try again later' }, { status: 429 });
  }
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expireAT = currentTime + OTP_EXPIRY;

  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Send the email
  try {
    await transporter.sendMail({
      from: `"BME Guide Website" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your one-time password (OTP) is:</p><h2>${otp}</h2><p>This code will expire in 10 minutes.</p>`,
    });

    const otpData = {
      otp,
      expireAT,
      count: (otpExists? otpExists.count : 0) + 1,
    };

    await redis.setex(`otp:${email}`, 600, otpData);



    // TODO: Store OTP in memory or cache (for verification later)

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: 'Email send failed' }, { status: 500 });
  }
}
