import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, LogOut, Search, Wallet } from 'lucide-react';
import DashboardHome from './DashboardHome';
import OrdersPage from './OrdersPage';
import HoldingsPage from './HoldingsPage';
import PositionsPage from './PositionsPage';
import FundsPage from './FundsPage';
import { supabase } from '../lib/supabase';

type Page = 'dashboard' | 'orders' | 'holdings' | 'positions' | 'funds';

interface Holding {
  symbol: string;
  quantity: number;
  current_price: number;
}

interface FundsData {
  available_margin: number;
  opening_balance: number;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [equity, setEquity] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Finnhub API key (replace with environment variable in production)
  const FINNHUB_API_KEY = 'd0vh3d9r01qkepd07c70d0vh3d9r01qkepd07c7g';

  const fetchEquityData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch funds
      const { data: fundsData, error: fundsError } = await supabase
        .from('funds')
        .select('available_margin, opening_balance')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fundsError) throw fundsError;
      if (!fundsData) {
        setError('No funds data available');
        setEquity(0);
        setProfit(0);
        setProfitMargin(0);
        return;
      }

      // Fetch holdings
      const { data: holdingsData, error: holdingsError } = await supabase
        .from('holdings')
        .select('symbol, quantity, current_price')
        .eq('user_id', user.id);

      if (holdingsError) throw holdingsError;

      let holdings: Holding[] = holdingsData || [];

      // Fetch real-time prices for holdings (individual API calls)
      if (holdings.length > 0) {
        try {
          // Create an array of promises for parallel API calls
          const pricePromises = holdings.map(async (holding) => {
            try {
              const response = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${holding.symbol}.NS&token=${FINNHUB_API_KEY}`
              );
              if (!response.ok) {
                console.error(`Failed to fetch price for ${holding.symbol}`);
                return { symbol: holding.symbol, price: holding.current_price };
              }
              const data = await response.json();
              // Return the current price (c) from the API response
              return { 
                symbol: holding.symbol, 
                price: data.c && data.c > 0 ? data.c : holding.current_price 
              };
            } catch (err) {
              console.error(`Error fetching price for ${holding.symbol}:`, err);
              return { symbol: holding.symbol, price: holding.current_price };
            }
          });

          // Wait for all price fetches to complete
          const prices = await Promise.all(pricePromises);

          // Update holdings with new prices
          holdings = holdings.map(holding => {
            const priceData = prices.find(p => p.symbol === holding.symbol);
            return {
              ...holding,
              current_price: priceData?.price || holding.current_price,
            };
          });
        } catch (apiError) {
          console.error('Failed to fetch stock prices:', apiError);
          setError('Failed to fetch real-time stock prices');
        }
      }

      // Calculate total holdings value
      const holdingsValue = holdings.reduce(
        (sum, holding) => sum + holding.quantity * holding.current_price,
        0
      );

      // Calculate equity and profit
      const totalEquity = holdingsValue + fundsData.available_margin;
      const totalProfit = totalEquity - fundsData.opening_balance;
      const profitPercentage =
        fundsData.opening_balance > 0 ? (totalProfit / fundsData.opening_balance) * 100 : 0;

      setEquity(totalEquity);
      setProfit(totalProfit);
      setProfitMargin(profitPercentage);
    } catch (err) {
      console.error('Error fetching equity data:', err);
      setError('Failed to load equity data');
    } finally {
      setLoading(false);
    }
  }, [user, FINNHUB_API_KEY]);

  useEffect(() => {
    fetchEquityData();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchEquityData, 30000);
    return () => clearInterval(interval);
  }, [fetchEquityData]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                          {/* <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg"> */}
                  <img src="logo.jpg" style={{height:"40px"}}></img>
                {/* </div> */}
                <span className="text-xl font-bold text-slate-800">Bullzaar</span>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className={`text-sm font-medium transition ${
                    currentPage === 'dashboard'
                      ? 'text-emerald-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentPage('orders')}
                  className={`text-sm font-medium transition ${
                    currentPage === 'orders'
                      ? 'text-emerald-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setCurrentPage('holdings')}
                  className={`text-sm font-medium transition ${
                    currentPage === 'holdings'
                      ? 'text-emerald-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Holdings
                </button>
                <button
                  onClick={() => setCurrentPage('positions')}
                  className={`text-sm font-medium transition ${
                    currentPage === 'positions'
                      ? 'text-emerald-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Positions
                </button>
                <button
                  onClick={() => setCurrentPage('funds')}
                  className={`text-sm font-medium transition ${
                    currentPage === 'funds'
                      ? 'text-emerald-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Funds
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-lg">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Equity</div>
                  <div className="text-sm font-bold text-slate-800">
                    {loading ? 'Loading...' : `₹${equity.toFixed(2)}`}
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    {loading ? (
                      'Loading...'
                    ) : (
                      <span
                        className={profit >= 0 ? 'text-emerald-600' : 'text-red-600'}
                      >
                        {profit >= 0 ? '+' : ''}₹{profit.toFixed(2)} (
                        {profitMargin.toFixed(1)}%)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none w-64 text-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="text-xs text-slate-500">Logged in as</div>
                  <div className="text-sm font-medium text-slate-800">
                    {user?.email}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg hover:bg-slate-100 transition"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}
        {currentPage === 'dashboard' && <DashboardHome />}
        {currentPage === 'orders' && <OrdersPage />}
        {currentPage === 'holdings' && <HoldingsPage />}
        {currentPage === 'positions' && <PositionsPage />}
        {currentPage === 'positions' && <PositionsPage />}
        {currentPage === 'funds' && <FundsPage />}
      </main>
    </div>
  );
}
