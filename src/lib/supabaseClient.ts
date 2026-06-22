// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const createMockSupabase = () => {
  const mock: any = new Proxy({}, {
    get(target, prop) {
      if (prop === 'then') return undefined;
      return () => {
        console.warn(`Supabase: Accessed property "${String(prop)}" on a mock client because NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined.`);
        return mock;
      };
    }
  });
  return mock;
};

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabase();

