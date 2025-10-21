import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserFunds, getUserHoldings, Holding, UserFunds } from '../services/tradingService';
import { getStockQuote, StockQuote, StockPriceStream } from '../services/stockApi';
import { PortfolioSummary } from './PortfolioSummary';
import { StockSearch } from './StockSearch';
import { HoldingsList } from './HoldingsList';
import { OrdersAndTransactions } from './OrdersAndTransactions';
import { FundManagement } from './FundManagement';
import { LogOut } from 'lucide-react';

export function TradingDashboard() {
  const { user, signOut } = useAuth();
  const [funds, setFunds] = useState<UserFunds | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [holdingPrices, setHoldingPrices] = useState<Map<string, StockQuote>>(new Map());
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'trade' | 'portfolio' | 'orders' | 'funds'>('trade');

  const loadUserData = async () => {
    if (!user) return;

    try {
      const [fundsData, holdingsData] = await Promise.all([
        getUserFunds(user.id),
        getUserHoldings(user.id),
      ]);

      setFunds(fundsData);
      setHoldings(holdingsData);

      if (holdingsData.length > 0) {
        const prices = await Promise.all(
          holdingsData.map(h => getStockQuote(h.symbol))
        );
        const priceMap = new Map(prices.map(p => [p.symbol, p]));
        setHoldingPrices(priceMap);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [user]);

  useEffect(() => {
    if (holdings.length === 0) return;

    const stream = new StockPriceStream();
    const unsubscribes = holdings.map(holding =>
      stream.subscribe(holding.symbol, (quote) => {
        setHoldingPrices(prev => new Map(prev).set(quote.symbol, quote));
      })
    );

    return () => {
      unsubscribes.forEach(unsub => unsub());
      stream.unsubscribeAll();
    };
  }, [holdings.map(h => h.symbol).join(',')]);

  const portfolioValue = holdings.reduce((total, holding) => {
    const currentPrice = holdingPrices.get(holding.symbol)?.price || holding.average_price;
    return total + (currentPrice * Number(holding.quantity));
  }, 0);

  const totalValue = (funds?.balance || 0) + portfolioValue;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Trading Platform</h1>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <PortfolioSummary
          balance={funds?.balance || 0}
          portfolioValue={portfolioValue}
          totalValue={totalValue}
        />

        <div className="mt-6 bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('trade')}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === 'trade'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Trade
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === 'portfolio'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('funds')}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === 'funds'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Funds
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'trade' && (
              <StockSearch
                userId={user!.id}
                availableBalance={funds?.balance || 0}
                onTradeComplete={loadUserData}
              />
            )}

            {activeTab === 'portfolio' && (
              <HoldingsList
                holdings={holdings}
                holdingPrices={holdingPrices}
                userId={user!.id}
                onTradeComplete={loadUserData}
              />
            )}

            {activeTab === 'orders' && (
              <OrdersAndTransactions userId={user!.id} />
            )}

            {activeTab === 'funds' && (
              <FundManagement
                userId={user!.id}
                currentBalance={funds?.balance || 0}
                onFundsUpdate={loadUserData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
