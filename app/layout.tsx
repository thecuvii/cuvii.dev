import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import PostHogPageView from "./PostHogPageView";
import { PHProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Life OS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PHProvider>
        <body className={inter.className}>
          <Suspense>
            <PostHogPageView />
          </Suspense>
          <div className="min-h-dvh">{children}</div>
        </body>
      </PHProvider>
    </html>
  );
}
