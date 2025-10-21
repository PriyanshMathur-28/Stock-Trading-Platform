import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import TradeModal from './TradeModal';

interface Holding {
  id: string;
  symbol: string;
  company_name: string;
  quantity: number;
  average_price: number;
  current_price: number;
}

export default function HoldingsPage() {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTradeModal, setShowTradeModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchHoldings();
      const interval = setInterval(updatePrices, 3000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchHoldings = async () => {
    try {
      const { data, error } = await supabase
        .from('holdings')
        .select('*')
        .eq('user_id', user!.id);

      if (error) throw error;
      if (data) setHoldings(data);
    } catch (error) {
      console.error('Error fetching holdings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrices = async () => {
    setHoldings((prev) =>
      prev.map((holding) => ({
        ...holding,
        current_price: holding.current_price * (1 + (Math.random() - 0.5) * 0.02),
      }))
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const totalInvestment = holdings.reduce((sum, h) => sum + h.quantity * h.average_price, 0);
  const totalCurrentValue = holdings.reduce((sum, h) => sum + h.quantity * h.current_price, 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Holdings</h1>
            <p className="text-slate-500 mt-1">Manage your stock portfolio</p>
          </div>
          <button
            onClick={() => setShowTradeModal(true)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Stock
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-sm text-slate-600 mb-2">Total Investment</div>
            <div className="text-2xl font-bold text-slate-800">
              ₹{totalInvestment.toFixed(2)}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-sm text-slate-600 mb-2">Current Value</div>
            <div className="text-2xl font-bold text-slate-800">
              ₹{totalCurrentValue.toFixed(2)}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-sm text-slate-600 mb-2">Total P&L</div>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toFixed(2)}
            </div>
            <div className={`text-sm mt-1 ${totalPnLPercent >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {holdings.length === 0 ? (
            <div className="p-12 text-center">
              <img src="logo.jpg" style={{height:"40px"}}></img>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Holdings Yet</h3>
              <p className="text-slate-500 mb-6">Start building your portfolio by adding your first stock</p>
              <button
                onClick={() => setShowTradeModal(true)}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                Add Your First Stock
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Company</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">Qty</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">Avg Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">LTP</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">Current Value</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {holdings.map((holding) => {
                    const currentValue = holding.quantity * holding.current_price;
                    const investment = holding.quantity * holding.average_price;
                    const pnl = currentValue - investment;
                    const pnlPercent = (pnl / investment) * 100;
                    const priceChange = holding.current_price - holding.average_price;

                    return (
                      <tr key={holding.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800">{holding.symbol}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600">{holding.company_name}</div>
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
                          <div className={`text-xs flex items-center justify-end gap-1 ${priceChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {priceChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {priceChange >= 0 ? '+' : ''}₹{priceChange.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm text-slate-800">₹{currentValue.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className={`text-sm font-semibold ${pnl >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)}
                          </div>
                          <div className={`text-xs ${pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%
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

      {showTradeModal && (
        <TradeModal onClose={() => {
          setShowTradeModal(false);
          fetchHoldings();
        }} />
      )}
    </>
  );
}
