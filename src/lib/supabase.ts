import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          specs: string
          price: string
          image: string
          category: string | null
          type: 'laptop' | 'accessory'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          specs: string
          price: string
          image: string
          category?: string | null
          type: 'laptop' | 'accessory'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          specs?: string
          price?: string
          image?: string
          category?: string | null
          type?: 'laptop' | 'accessory'
          created_at?: string
          updated_at?: string
        }
      }
      contact_info: {
        Row: {
          id: string
          phone: string
          whatsapp: string
          instagram: string
          instagram_handle: string | null
          location_lat: string
          location_lng: string
          location_place_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          phone: string
          whatsapp: string
          instagram: string
          instagram_handle?: string | null
          location_lat: string
          location_lng: string
          location_place_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string
          whatsapp?: string
          instagram?: string
          instagram_handle?: string | null
          location_lat?: string
          location_lng?: string
          location_place_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
