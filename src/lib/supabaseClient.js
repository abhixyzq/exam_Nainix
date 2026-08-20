import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Checks if Supabase credentials have been properly configured
 * @returns {boolean}
 */
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project') &&
    supabaseAnonKey !== 'your-anon-key-here'
  );
};

/**
 * Initialized Supabase client instance (or null dummy client if not yet configured)
 */
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://mock-instance.supabase.co', 'mock-anon-key');

export default supabase;
