# BME Guide Website

An unofficial guide website for BME juniors at Mahidol University.  
Built with [Next.js](https://nextjs.org), featuring OTP email verification for secure access to learning and lab resources.

---

## Features

- **OTP Email Verification:** Only Mahidol student emails (`@student.mahidol.edu`) can access protected pages.
- **Lab & Learning Resources:** Curated content for BME students.
- **Responsive Design:** Works on desktop and mobile.
- **SEO Protection:** Site is not indexed by search engines.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**  
   Create a `.env.local` file with:
   ```
   GMAIL_USER=your_gmail_address
   GMAIL_PASS=your_gmail_app_password
   JWT_SECRET=your_base64_secret
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000)

---

## Deployment

- Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.
- Set environment variables securely in your deployment dashboard.

---

## Security Notes

- OTPs and verification attempts are stored in memory (for single-instance deployments).
- For production scaling, use Redis or a database for OTP storage.
- `.env.local` should **never** be committed to version control.

---

## Contact

Created by Pannawat Thongpron (BME18), Mahidol University.