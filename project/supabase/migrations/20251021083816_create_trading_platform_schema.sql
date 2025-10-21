/*
  # Stock Trading Platform Schema

  ## Overview
  Complete database schema for a stock trading platform with real-time trading capabilities.

  ## New Tables

  ### 1. `users`
  User profiles and account information
  - `id` (uuid, primary key) - User identifier
  - `email` (text, unique) - User email
  - `full_name` (text) - User's full name
  - `created_at` (timestamptz) - Account creation timestamp

  ### 2. `user_funds`
  User account balance and fund tracking
  - `id` (uuid, primary key) - Fund record identifier
  - `user_id` (uuid, foreign key) - Reference to users table
  - `balance` (numeric) - Current available balance
  - `total_deposited` (numeric) - Total amount deposited
  - `total_withdrawn` (numeric) - Total amount withdrawn
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `holdings`
  Current stock holdings for each user
  - `id` (uuid, primary key) - Holding record identifier
  - `user_id` (uuid, foreign key) - Reference to users table
  - `symbol` (text) - Stock symbol (e.g., AAPL, GOOGL)
  - `quantity` (numeric) - Number of shares held
  - `average_price` (numeric) - Average purchase price per share
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. `orders`
  All buy/sell orders (pending, completed, cancelled)
  - `id` (uuid, primary key) - Order identifier
  - `user_id` (uuid, foreign key) - Reference to users table
  - `symbol` (text) - Stock symbol
  - `order_type` (text) - 'buy' or 'sell'
  - `quantity` (numeric) - Number of shares
  - `price` (numeric) - Price per share at order time
  - `total_amount` (numeric) - Total order value
  - `status` (text) - 'pending', 'completed', 'cancelled'
  - `created_at` (timestamptz) - Order creation time
  - `completed_at` (timestamptz) - Order completion time

  ### 5. `transactions`
  Completed transaction history
  - `id` (uuid, primary key) - Transaction identifier
  - `user_id` (uuid, foreign key) - Reference to users table
  - `order_id` (uuid, foreign key) - Reference to orders table
  - `symbol` (text) - Stock symbol
  - `transaction_type` (text) - 'buy', 'sell', 'deposit', 'withdraw'
  - `quantity` (numeric) - Number of shares (null for deposits/withdrawals)
  - `price` (numeric) - Price per share (null for deposits/withdrawals)
  - `amount` (numeric) - Total transaction amount
  - `created_at` (timestamptz) - Transaction timestamp

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Authenticated users only

  ## Important Notes
  - All monetary values use numeric type for precision
  - Indexes added for common query patterns (user_id, symbol lookups)
  - Foreign key constraints ensure data integrity
  - Default values ensure clean data state
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create user_funds table
CREATE TABLE IF NOT EXISTS user_funds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  balance numeric(15, 2) DEFAULT 0.00 NOT NULL,
  total_deposited numeric(15, 2) DEFAULT 0.00 NOT NULL,
  total_withdrawn numeric(15, 2) DEFAULT 0.00 NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_funds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own funds"
  ON user_funds FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own funds"
  ON user_funds FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own funds"
  ON user_funds FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create holdings table
CREATE TABLE IF NOT EXISTS holdings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symbol text NOT NULL,
  quantity numeric(15, 4) DEFAULT 0 NOT NULL,
  average_price numeric(15, 2) NOT NULL,
  updated_at timestamptz DEFAULT now(),
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
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symbol text NOT NULL,
  order_type text NOT NULL CHECK (order_type IN ('buy', 'sell')),
  quantity numeric(15, 4) NOT NULL,
  price numeric(15, 2) NOT NULL,
  total_amount numeric(15, 2) NOT NULL,
  status text DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

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

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  symbol text,
  transaction_type text NOT NULL CHECK (transaction_type IN ('buy', 'sell', 'deposit', 'withdraw')),
  quantity numeric(15, 4),
  price numeric(15, 2),
  amount numeric(15, 2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);