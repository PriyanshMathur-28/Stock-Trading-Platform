import React, { useState, useEffect, useCallback } from 'react';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { searchStocks, getStockQuote, StockQuote, getPopularStocks, StockPriceStream } from '../services/stockApi';
import { TradeModal } from './TradeModal';
import { debounce } from 'lodash'; // Assuming lodash is installed for debouncing

// Define StockQuote interface for clarity
interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

interface StockSearchProps {
  userId: string;
  availableBalance: number;
  onTradeComplete: () => void;
}

export function StockSearch({ userId, availableBalance, onTradeComplete }: StockSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ symbol: string; name: string }>>([]);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [stockQuote, setStockQuote] = useState<StockQuote | null>(null);
  const [popularStocks, setPopularStocks] = useState<StockQuote[]>([]);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load popular stocks on mount
  useEffect(() => {
    const loadPopularStocks = async () => {
      try {
        const symbols = await getPopularStocks();
        const quotes = await Promise.all(symbols.map(async (symbol) => {
          try {
            return await getStockQuote(symbol);
          } catch (err) {
            console.error(`Failed to fetch quote for ${symbol}:`, err);
            return null;
          }
        }));
        setPopularStocks(quotes.filter((quote): quote is StockQuote => quote !== null));
      } catch (err) {
        setError('Failed to load popular stocks. Please try again.');
      }
    };

    loadPopularStocks();
  }, []);

  // Subscribe to stock price updates
  useEffect(() => {
    const stream = new StockPriceStream();
    const unsubscribes = popularStocks.map(stock =>
      stream.subscribe(stock.symbol, (quote) => {
        setPopularStocks(prev =>
          prev.map(s => s.symbol === quote.symbol ? { ...s, ...quote } : s)
        );
      })
    );

    return () => {
      unsubscribes.forEach(unsub => unsub());
      stream.unsubscribeAll();
    };
  }, [popularStocks]); // Depend on the array, not its length

  // Debounced search handler
  const performSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length > 0) {
        try {
          const results = await searchStocks(query);
          setSearchResults(results);
        } catch (err) {
          setError('Failed to search stocks. Please try again.');
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    performSearch(searchQuery);
    return () => performSearch.cancel(); // Cleanup debounce
  }, [searchQuery, performSearch]);

  const handleStockSelect = async (symbol: string) => {
    try {
      const quote = await getStockQuote(symbol);
      setStockQuote(quote);
      setSelectedStock(symbol);
      setSearchQuery('');
      setSearchResults([]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stock quote. Please try again.');
    }
  };

  const handleTradeClick = () => {
    setShowTradeModal(true);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
          {error}
        </div>
      )}
      <div className="relative">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stocks (e.g., AAPL, GOOGL)..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            aria-label="Search stocks"
          />
        </div>

        {searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            {searchResults.map((result) => (
              <button
                key={result.symbol}
                onClick={() => handleStockSelect(result.symbol)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Select ${result.symbol}`}
              >
                <span className="font-medium text-gray-900">{result.symbol}</span>
                <span className="text-sm text-gray-600">{result.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedStock && stockQuote && (
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold">{stockQuote.symbol}</h2>
              <p className="text-blue-100 mt-1">Latest Quote</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                ${stockQuote.price.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 justify-end mt-1 ${
                stockQuote.change >= 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                {stockQuote.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <TrendingDown className="w-4 h-4" aria-hidden="true" />
                )}
                <span className="font-medium">
                  {stockQuote.change >= 0 ? '+' : ''}
                  {stockQuote.change.toFixed(2)} ({stockQuote.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-blue-200 text-sm">Open</div>
              <div className="font-semibold">${stockQuote.open.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm">High</div>
              <div className="font-semibold">${stockQuote.high.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm">Low</div>
              <div className="font-semibold">${stockQuote.low.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm">Volume</div>
              <div className="font-semibold">{(stockQuote.volume / 1000000).toFixed(2)}M</div>
            </div>
          </div>

          <button
            onClick={handleTradeClick}
            className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Trade ${stockQuote.symbol}`}
          >
            Trade {stockQuote.symbol}
          </button>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Stocks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularStocks.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => handleStockSelect(stock.symbol)}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Select ${stock.symbol}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-gray-900">{stock.symbol}</div>
                <div className="text-lg font-semibold text-gray-900">
                  ${stock.price.toFixed(2)}
                </div>
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stock.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stock.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <TrendingDown className="w-4 h-4" aria-hidden="true" />
                )}
                <span className="font-medium">
                  {stock.change >= 0 ? '+' : ''}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {showTradeModal && stockQuote && (
        <TradeModal
          symbol={stockQuote.symbol}
          currentPrice={stockQuote.price}
          userId={userId}
          availableBalance={availableBalance}
          onClose={() => setShowTradeModal(false)}
          onTradeComplete={() => {
            setShowTradeModal(false);
            onTradeComplete();
          }}
        />
      )}
    </div>
  );
}