import {createClient} from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_BASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY;

export const supabase = createClient(
  supabaseUrl ?? "https://your-project-id.supabase.co", 
  supabaseKey ?? "your-anon-key"
);
