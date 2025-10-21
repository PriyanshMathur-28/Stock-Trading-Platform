import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string | null;
          created_at?: string;
        };
      };
      funds: {
        Row: {
          id: string;
          user_id: string;
          available_margin: number;
          used_margin: number;
          opening_balance: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          available_margin?: number;
          used_margin?: number;
          opening_balance?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          available_margin?: number;
          used_margin?: number;
          opening_balance?: number;
          updated_at?: string;
        };
      };
      holdings: {
        Row: {
          id: string;
          user_id: string;
          symbol: string;
          company_name: string;
          quantity: number;
          average_price: number;
          current_price: number;
          last_updated: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          symbol: string;
          company_name: string;
          quantity?: number;
          average_price: number;
          current_price: number;
          last_updated?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          symbol?: string;
          company_name?: string;
          quantity?: number;
          average_price?: number;
          current_price?: number;
          last_updated?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          symbol: string;
          order_type: string;
          quantity: number;
          price: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          symbol: string;
          order_type: string;
          quantity: number;
          price: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          symbol?: string;
          order_type?: string;
          quantity?: number;
          price?: number;
          status?: string;
          created_at?: string;
        };
      };
      portfolio_history: {
        Row: {
          id: string;
          user_id: string;
          portfolio_value: number;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          portfolio_value: number;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          portfolio_value?: number;
          recorded_at?: string;
        };
      };
    };
  };
};
