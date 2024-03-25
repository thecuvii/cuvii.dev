import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PHProvider } from "./providers";
import PostHogPageView from "./PostHogPageView";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cuvii.dev",
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
          <div className="h-[100dvh]">{children}</div>
        </body>
      </PHProvider>
    </html>
  );
}
