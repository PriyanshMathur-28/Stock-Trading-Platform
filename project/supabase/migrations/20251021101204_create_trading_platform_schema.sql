/*
  # Create Trading Platform Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `created_at` (timestamptz)
    
    - `funds`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `available_margin` (decimal)
      - `used_margin` (decimal)
      - `opening_balance` (decimal)
      - `updated_at` (timestamptz)
    
    - `holdings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `symbol` (text) - stock symbol
      - `company_name` (text)
      - `quantity` (integer)
      - `average_price` (decimal)
      - `current_price` (decimal)
      - `last_updated` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `symbol` (text)
      - `order_type` (text) - BUY or SELL
      - `quantity` (integer)
      - `price` (decimal)
      - `status` (text) - PENDING, COMPLETED, CANCELLED
      - `created_at` (timestamptz)
    
    - `portfolio_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `portfolio_value` (decimal)
      - `recorded_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create funds table
CREATE TABLE IF NOT EXISTS funds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  available_margin decimal(15,2) DEFAULT 0,
  used_margin decimal(15,2) DEFAULT 0,
  opening_balance decimal(15,2) DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE funds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own funds"
  ON funds FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own funds"
  ON funds FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own funds"
  ON funds FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create holdings table
CREATE TABLE IF NOT EXISTS holdings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  symbol text NOT NULL,
  company_name text NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  average_price decimal(15,2) NOT NULL,
  current_price decimal(15,2) NOT NULL,
  last_updated timestamptz DEFAULT now(),
  UNIQUE(user_id, symbol)
);

ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own holdings"
  ON holdings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own holdings"
  ON holdings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own holdings"
  ON holdings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own holdings"
  ON holdings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  symbol text NOT NULL,
  order_type text NOT NULL,
  quantity integer NOT NULL,
  price decimal(15,2) NOT NULL,
  status text DEFAULT 'PENDING',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create portfolio_history table
CREATE TABLE IF NOT EXISTS portfolio_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  portfolio_value decimal(15,2) NOT NULL,
  recorded_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own portfolio history"
  ON portfolio_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolio history"
  ON portfolio_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_holdings_user_id ON holdings(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_history_user_id ON portfolio_history(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_history_recorded_at ON portfolio_history(recorded_at);