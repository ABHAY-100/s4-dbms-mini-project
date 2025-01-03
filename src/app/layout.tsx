import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeathSet",
  description: "DeathSet - Your badass mortuary sidekick!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
