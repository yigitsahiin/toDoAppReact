// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ddjmxlkdzxprbcqcmfzn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkam14bGtkenhwcmJjcWNtZnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNzQ3MzQsImV4cCI6MjAzMDk1MDczNH0.8qlWKxxVKCRi72C4uzcThEFBp_ckHEBRdQ4trJrQk0g';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
