/* eslint-disable node/prefer-global/process */
'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '../database.type';

export function createSupabase() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
