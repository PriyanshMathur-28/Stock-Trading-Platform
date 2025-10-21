import { supabase } from '../lib/supabase';
import { getStockQuote } from './stockApi';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface UserFunds {
  id: string;
  user_id: string;
  balance: number;
  total_deposited: number;
  total_withdrawn: number;
  updated_at: string;
}

export interface Holding {
  id: string;
  user_id: string;
  symbol: string;
  quantity: number;
  average_price: number;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  symbol: string;
  order_type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  completed_at?: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  order_id?: string;
  symbol?: string;
  transaction_type: 'buy' | 'sell' | 'deposit' | 'withdraw';
  quantity?: number;
  price?: number;
  amount: number;
  created_at: string;
}

export async function initializeUserAccount(userId: string, email: string, fullName: string): Promise<void> {
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  if (!existingUser) {
    await supabase.from('users').insert({
      id: userId,
      email,
      full_name: fullName,
    });

    await supabase.from('user_funds').insert({
      user_id: userId,
      balance: 10000,
      total_deposited: 10000,
      total_withdrawn: 0,
    });
  }
}

export async function getUserFunds(userId: string): Promise<UserFunds | null> {
  const { data, error } = await supabase
    .from('user_funds')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getUserHoldings(userId: string): Promise<Holding[]> {
  const { data, error } = await supabase
    .from('holdings')
    .select('*')
    .eq('user_id', userId)
    .order('symbol');

  if (error) throw error;
  return data || [];
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function executeBuyOrder(
  userId: string,
  symbol: string,
  quantity: number
): Promise<{ success: boolean; message: string }> {
  try {
    const quote = await getStockQuote(symbol);
    const totalCost = quote.price * quantity;

    const funds = await getUserFunds(userId);
    if (!funds) {
      return { success: false, message: 'User funds not found' };
    }

    if (funds.balance < totalCost) {
      return { success: false, message: 'Insufficient funds' };
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        symbol: symbol.toUpperCase(),
        order_type: 'buy',
        quantity,
        price: quote.price,
        total_amount: totalCost,
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) throw orderError;

    await supabase
      .from('user_funds')
      .update({
        balance: funds.balance - totalCost,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    const { data: existingHolding } = await supabase
      .from('holdings')
      .select('*')
      .eq('user_id', userId)
      .eq('symbol', symbol.toUpperCase())
      .maybeSingle();

    if (existingHolding) {
      const newQuantity = Number(existingHolding.quantity) + quantity;
      const newAveragePrice =
        (Number(existingHolding.average_price) * Number(existingHolding.quantity) + totalCost) / newQuantity;

      await supabase
        .from('holdings')
        .update({
          quantity: newQuantity,
          average_price: newAveragePrice,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingHolding.id);
    } else {
      await supabase.from('holdings').insert({
        user_id: userId,
        symbol: symbol.toUpperCase(),
        quantity,
        average_price: quote.price,
      });
    }

    await supabase.from('transactions').insert({
      user_id: userId,
      order_id: order.id,
      symbol: symbol.toUpperCase(),
      transaction_type: 'buy',
      quantity,
      price: quote.price,
      amount: totalCost,
    });

    return { success: true, message: 'Buy order executed successfully' };
  } catch (error) {
    console.error('Buy order error:', error);
    return { success: false, message: 'Failed to execute buy order' };
  }
}

export async function executeSellOrder(
  userId: string,
  symbol: string,
  quantity: number
): Promise<{ success: boolean; message: string }> {
  try {
    const { data: holding } = await supabase
      .from('holdings')
      .select('*')
      .eq('user_id', userId)
      .eq('symbol', symbol.toUpperCase())
      .maybeSingle();

    if (!holding || Number(holding.quantity) < quantity) {
      return { success: false, message: 'Insufficient shares to sell' };
    }

    const quote = await getStockQuote(symbol);
    const totalProceeds = quote.price * quantity;

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        symbol: symbol.toUpperCase(),
        order_type: 'sell',
        quantity,
        price: quote.price,
        total_amount: totalProceeds,
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const funds = await getUserFunds(userId);
    if (!funds) {
      return { success: false, message: 'User funds not found' };
    }

    await supabase
      .from('user_funds')
      .update({
        balance: funds.balance + totalProceeds,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    const newQuantity = Number(holding.quantity) - quantity;

    if (newQuantity === 0) {
      await supabase.from('holdings').delete().eq('id', holding.id);
    } else {
      await supabase
        .from('holdings')
        .update({
          quantity: newQuantity,
          updated_at: new Date().toISOString(),
        })
        .eq('id', holding.id);
    }

    await supabase.from('transactions').insert({
      user_id: userId,
      order_id: order.id,
      symbol: symbol.toUpperCase(),
      transaction_type: 'sell',
      quantity,
      price: quote.price,
      amount: totalProceeds,
    });

    return { success: true, message: 'Sell order executed successfully' };
  } catch (error) {
    console.error('Sell order error:', error);
    return { success: false, message: 'Failed to execute sell order' };
  }
}

export async function depositFunds(
  userId: string,
  amount: number
): Promise<{ success: boolean; message: string }> {
  try {
    const funds = await getUserFunds(userId);
    if (!funds) {
      return { success: false, message: 'User funds not found' };
    }

    await supabase
      .from('user_funds')
      .update({
        balance: funds.balance + amount,
        total_deposited: funds.total_deposited + amount,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    await supabase.from('transactions').insert({
      user_id: userId,
      transaction_type: 'deposit',
      amount,
    });

    return { success: true, message: 'Funds deposited successfully' };
  } catch (error) {
    console.error('Deposit error:', error);
    return { success: false, message: 'Failed to deposit funds' };
  }
}

export async function withdrawFunds(
  userId: string,
  amount: number
): Promise<{ success: boolean; message: string }> {
  try {
    const funds = await getUserFunds(userId);
    if (!funds) {
      return { success: false, message: 'User funds not found' };
    }

    if (funds.balance < amount) {
      return { success: false, message: 'Insufficient funds' };
    }

    await supabase
      .from('user_funds')
      .update({
        balance: funds.balance - amount,
        total_withdrawn: funds.total_withdrawn + amount,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    await supabase.from('transactions').insert({
      user_id: userId,
      transaction_type: 'withdraw',
      amount,
    });

    return { success: true, message: 'Funds withdrawn successfully' };
  } catch (error) {
    console.error('Withdraw error:', error);
    return { success: false, message: 'Failed to withdraw funds' };
  }
}
