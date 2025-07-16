import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BME Guide Website",
  description: "A guide website for BME junior, created by shin1am (BME18)",

  openGraph: {
    title: 'BME Guide Website',
    description: 'A guide website for BME junior, created by shin1am (BME18)',
    url: 'https://bme-guide-website.vercel.app', // ***IMPORTANT: Replace with your actual deployed website URL***
    siteName: 'BME Guide',
    images: [
      {
        url: '/public/logo.png', // Path to your OG image in the `public` directory
        width: 1200, // Recommended width for OG images
        height: 630, // Recommended height for OG images
        alt: 'BME Guide Logo and Banner', // Alt text for accessibility
      },
      // You can add more image objects if you have different sizes or types
    ],
    locale: 'en_US', // Language of your content
    type: 'website', // Type of content (e.g., 'website', 'article', 'blog')
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
