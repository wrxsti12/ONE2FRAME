import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://byegymkregyepzpmogfs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZWd5bWtyZWd5ZXB6cG1vZ2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMzgxODMsImV4cCI6MjA2NTcxNDE4M30.vICrLHIdd89MjNg9ew3DXZww0mbvoX7fbqBw3tW-5g4'
export const supabase = createClient(supabaseUrl, supabaseKey)
