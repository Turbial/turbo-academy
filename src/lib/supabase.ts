// Safe Supabase client creation — fully lazy to avoid build crashes
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;
let _serviceClient: SupabaseClient | null = null;

export function getClient(): SupabaseClient {
  if (!_client) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      // During build/SSR — return a no-op proxy
      return createClient("https://placeholder.supabase.co", "placeholder");
    }

    _client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _client;
}

export function getServiceClient(): SupabaseClient {
  if (!_serviceClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return createClient("https://placeholder.supabase.co", "placeholder");
    }

    _serviceClient = createClient(supabaseUrl, serviceKey);
  }
  return _serviceClient;
}

/** Convenience export — call getClient() to get the real client */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return getClient()[prop as keyof SupabaseClient];
  },
});
