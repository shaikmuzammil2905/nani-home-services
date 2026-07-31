import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://flniztvymlqatliegqet.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbml6dHZ5bWxxYXRsaWVncWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0Nzc1MzEsImV4cCI6MjEwMTA1MzUzMX0.Fzp324emIYNFCfvqJHOr_rNZBDUjVxhv9iq9Q8hIwlQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
