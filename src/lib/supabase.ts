import {createClient} from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_BASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY;

// Jangan gunakan '!' jika tidak yakin variabelnya ada saat build
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseKey || "placeholder"
);
