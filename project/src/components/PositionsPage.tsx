import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp } from 'lucide-react';

interface Holding {
  id: string;
  symbol: string;
  company_name: string;
  quantity: number;
  average_price: number;
  current_price: number;
}

export default function PositionsPage() {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized fetchHoldings to prevent redefinition
  const fetchHoldings = useCallback(async () => {
    if (!user) return; // Guard against no user
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('holdings')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      if (data) {
        setHoldings(data);
      }
    } catch (err) {
      console.error('Error fetching holdings:', err);
      setError('Failed to load positions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Memoized updatePrices to prevent redefinition
  const updatePrices = useCallback(() => {
    setHoldings((prev) =>
      prev.map((holding) => ({
        ...holding,
        current_price: holding.current_price * (1 + (Math.random() - 0.5) * 0.02),
      }))
    );
  }, []);

  useEffect(() => {
    if (user) {
      console.log('Fetching holdings for user:', user.id); // Debug log
      fetchHoldings();
      const interval = setInterval(updatePrices, 3000);
      return () => {
        console.log('Cleaning up interval and effect'); // Debug log
        clearInterval(interval);
      };
    }
  }, [user, fetchHoldings, updatePrices]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Positions</h1>
        <p className="text-slate-500 mt-1">Monitor your current market positions</p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {holdings.length === 0 ? (
          <div className="p-12 text-center">
            <TrendingUp className="w-16 h-16 mx-auto text-slate-400 mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No Open Positions</h3>
            <p className="text-slate-500">You currently have no open positions in the market</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Instrument</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">Avg Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">LTP</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">P&L</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">Chg %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {holdings.map((holding) => {
                  const pnl = (holding.current_price - holding.average_price) * holding.quantity;
                  const changePercent =
                    ((holding.current_price - holding.average_price) / holding.average_price) * 100;

                  return (
                    <tr key={holding.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{holding.symbol}</div>
                        <div className="text-xs text-slate-500">{holding.company_name}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-sm text-slate-800">{holding.quantity}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-sm text-slate-800">₹{holding.average_price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-sm font-medium text-slate-800">
                          ₹{holding.current_price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div
                          className={`text-sm font-semibold ${
                            pnl >= 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}
                        >
                          {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            changePercent >= 0
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {changePercent >= 0 ? '+' : ''}
                          {changePercent.toFixed(2)}%
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}