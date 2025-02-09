import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/Header";
import Authlaoyut from "./_components/Authlaoyut";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RideSewa by Chupehra Sahib",
  description: "Ridesewa by Chupehra Sahib",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Authlaoyut>
          <Header />
          <div className="max-w-3xl pb-[100px] min-h-[90vh] relative mx-auto">
            {children}
          </div>
          <footer className="text-center mt-8 mb-[100px]">
            <p>
              &copy; {new Date().getFullYear()} Baba Deep Singh Ji Sanstar Sewa Dal. All Rights Reserved.
            </p>
            <p className="text-gray-700">
              Visit us at <Link href="https://www.ridesewa.ca">ridesewa.ca</Link>
            </p>
            <div className="mt-4">
              <Link href="/privacy" className="mx-2 text-gray-700">Privacy Policy</Link>
              <Link href="/terms" className="mx-2 text-gray-700">Terms of Service</Link>
            </div>
          </footer>
        </Authlaoyut>
      </body>
    </html>
  );
}
