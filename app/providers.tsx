"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true,
    capture_performance: true,
  });
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
