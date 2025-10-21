import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import PortfolioChart from './PortfolioChart';
import HoldingsPieChart from './HoldingsPieChart';
import HoldingsTable from './HoldingsTable';

interface FundsData {
  available_margin: number;
  used_margin: number;
  opening_balance: number;
}

interface Holding {
  id: string;
  symbol: string;
  company_name: string;
  quantity: number;
  average_price: number;
  current_price: number;
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [funds, setFunds] = useState<FundsData | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
      const interval = setInterval(updatePrices, 3000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [fundsRes, holdingsRes] = await Promise.all([
        supabase.from('funds').select('*').eq('user_id', user!.id).maybeSingle(),
        supabase.from('holdings').select('*').eq('user_id', user!.id),
      ]);

      if (fundsRes.data) setFunds(fundsRes.data);
      if (holdingsRes.data) setHoldings(holdingsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const calculateTotals = () => {
    const investment = holdings.reduce(
      (sum, h) => sum + h.quantity * h.average_price,
      0
    );
    const currentValue = holdings.reduce(
      (sum, h) => sum + h.quantity * h.current_price,
      0
    );
    const pnl = currentValue - investment;
    const pnlPercent = investment > 0 ? (pnl / investment) * 100 : 0;

    return { investment, currentValue, pnl, pnlPercent };
  };

  const totals = calculateTotals();

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
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Hi, User!</h2>
        <p className="text-slate-500">Welcome back to your trading dashboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{marginLeft:"418px"}}>
        {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-6">Equity</h3>
          <div className="space-y-6">
            <div>
              <div className="text-4xl font-bold text-slate-800">
                {funds?.available_margin.toFixed(2)}k
              </div>
              <div className="text-sm text-slate-500 mt-1">Margin available</div>
            </div>
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Margins used</span>
                <span className="text-sm font-semibold text-slate-800">
                  {funds?.used_margin.toFixed(2) || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Opening balance</span>
                <span className="text-sm font-semibold text-slate-800">
                  {funds?.opening_balance.toFixed(2)}k
                </span>
              </div>
            </div>
          </div>
        </div> */}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-6">
            Holdings ({holdings.length})
          </h3>
          <div className="space-y-6">
            <div>
              <div className="text-4xl font-bold text-emerald-600">
                {totals.pnl >= 0 ? '+' : ''}
                {(totals.pnl / 1000).toFixed(2)}k
              </div>
              <div className="text-sm text-slate-500 mt-1">
                P&L{' '}
                <span
                  className={`font-semibold ${
                    totals.pnlPercent >= 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {totals.pnlPercent >= 0 ? '+' : ''}
                  {totals.pnlPercent.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Current Value</span>
                <span className="text-sm font-semibold text-slate-800">
                  {(totals.currentValue / 1000).toFixed(2)}k
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Investment</span>
                <span className="text-sm font-semibold text-slate-800">
                  {(totals.investment / 1000).toFixed(2)}k
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioChart />
        </div>
        <div>
          <HoldingsPieChart holdings={holdings} />
        </div>
      </div>

      <HoldingsTable holdings={holdings} />
    </div>
  );
}
