import nodemailer from 'nodemailer';

if (!globalThis.otpStore) {
    globalThis.otpStore = {};
}

const MAX_REQUESTS = 5;
const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes

export async function POST(req) {
  const { email } = await req.json();
  const currentTime = Date.now();

  const store = globalThis.otpStore;

  // Cleanup expired OTPs before processing
  for (const key in store) {
    if (store[key].expireAT < currentTime - 30000 ) {
      delete store[key];
    }
  }

  if (!email || !email.endsWith('@student.mahidol.edu')) {
    return Response.json({ success: false, error: 'Invalid university email' }, { status: 400 });
  }

  const OTP_exists = store[email];

  if (OTP_exists && OTP_exists.count >= MAX_REQUESTS) {
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

    store[email] = {
      otp,
      expireAT,
      count: (OTP_exists ? OTP_exists.count : 0) + 1,
    };

    console.log('OTP stored successfully for:', email, store[email]);

    // TODO: Store OTP in memory or cache (for verification later)

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: 'Email send failed' }, { status: 500 });
  }
}
