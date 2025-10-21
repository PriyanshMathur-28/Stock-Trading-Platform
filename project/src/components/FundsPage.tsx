import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface FundsData {
  id: string;
  available_margin: number;
  used_margin: number;
  opening_balance: number;
  updated_at: string;
}

export default function FundsPage() {
  const { user } = useAuth();
  const [funds, setFunds] = useState<FundsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFunds();
    }
  }, [user]);

  const fetchFunds = async () => {
    try {
      const { data, error } = await supabase
        .from('funds')
        .select('*')
        .eq('user_id', user!.id)
        .maybeSingle();

      if (error) throw error;
      if (data) setFunds(data);
    } catch (error) {
      console.error('Error fetching funds:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!funds) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No funds data available</p>
      </div>
    );
  }

  const totalBalance = funds.available_margin + funds.used_margin;
  const utilizationPercent = (funds.used_margin / totalBalance) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Funds</h1>
        <p className="text-slate-500 mt-1">Manage your trading account funds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="text-sm font-medium opacity-90">Available Margin</div>
          </div>
          <div className="text-3xl font-bold">₹{funds.available_margin.toFixed(2)}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-slate-600" />
            </div>
            <div className="text-sm font-medium text-slate-600">Used Margin</div>
          </div>
          <div className="text-3xl font-bold text-slate-800">₹{funds.used_margin.toFixed(2)}</div>
          <div className="mt-2 text-sm text-slate-500">
            {utilizationPercent.toFixed(1)}% utilized
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-slate-600" />
            </div>
            <div className="text-sm font-medium text-slate-600">Opening Balance</div>
          </div>
          <div className="text-3xl font-bold text-slate-800">₹{funds.opening_balance.toFixed(2)}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-slate-600" />
            </div>
            <div className="text-sm font-medium text-slate-600">Total Balance</div>
          </div>
          <div className="text-3xl font-bold text-slate-800">₹{totalBalance.toFixed(2)}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Margin Utilization</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Available</span>
              <span className="font-semibold text-emerald-600">
                ₹{funds.available_margin.toFixed(2)}
              </span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all"
                style={{ width: `${((funds.available_margin / totalBalance) * 100).toFixed(1)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Used</span>
              <span className="font-semibold text-slate-800">₹{funds.used_margin.toFixed(2)}</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-400 rounded-full transition-all"
                style={{ width: `${utilizationPercent.toFixed(1)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Fund Details</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-slate-100">
            <span className="text-slate-600">Opening Balance</span>
            <span className="font-semibold text-slate-800">₹{funds.opening_balance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-100">
            <span className="text-slate-600">Available Margin</span>
            <span className="font-semibold text-emerald-600">₹{funds.available_margin.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-100">
            <span className="text-slate-600">Used Margin</span>
            <span className="font-semibold text-slate-800">₹{funds.used_margin.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-slate-600">Total Balance</span>
            <span className="font-bold text-slate-900 text-lg">₹{totalBalance.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-2">About Trading Margins</h4>
        <p className="text-sm text-blue-700">
          Your available margin is the amount you can use for new trades. Used margin represents funds
          allocated to your current positions. Make sure to maintain sufficient margin to avoid position
          liquidation.
        </p>
      </div>
    </div>
  );
}
