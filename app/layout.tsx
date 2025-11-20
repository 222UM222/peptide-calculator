import type { Metadata } from "next";
import "./globals.css";
import { APP_TITLE } from "@/const";

export const metadata: Metadata = {
  title: APP_TITLE,
  description: "Calculate peptide reconstitution measurements for accurate dosing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
