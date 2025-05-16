import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

import Sucker from "@/components/Sucker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Devfound",
  description: "Find repositories that match your skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Sucker>
          <Navbar />
          {children}
          <Footer />
        </Sucker>

        <Analytics />
      </body>
    </html>
  );
}
