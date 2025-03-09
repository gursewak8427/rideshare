import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Authlaoyut from "./_components/Authlaoyut";
import UserLayout from "./_layouts/UserLayout";

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
          <UserLayout>{children}</UserLayout>
          <Footer />
        </Authlaoyut>
      </body>
    </html>
  );
}
