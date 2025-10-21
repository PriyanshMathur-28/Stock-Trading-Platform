export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

const POPULAR_STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX'];

function generateRealisticPrice(symbol: string, basePrice: number): StockQuote {
  const now = Date.now();
  const seed = now + symbol.charCodeAt(0);
  const random = Math.sin(seed) * 10000;
  const variance = (random - Math.floor(random)) * 0.02;

  const currentPrice = basePrice * (1 + variance);
  const open = basePrice * (1 + (Math.sin(seed * 0.5) * 0.01));
  const high = Math.max(currentPrice, open) * (1 + Math.abs(Math.sin(seed * 0.3) * 0.015));
  const low = Math.min(currentPrice, open) * (1 - Math.abs(Math.sin(seed * 0.7) * 0.015));
  const previousClose = basePrice;

  const change = currentPrice - previousClose;
  const changePercent = (change / previousClose) * 100;

  return {
    symbol,
    price: Number(currentPrice.toFixed(2)),
    change: Number(change.toFixed(2)),
    changePercent: Number(changePercent.toFixed(2)),
    volume: Math.floor(Math.abs(Math.sin(seed * 0.9) * 50000000)) + 10000000,
    high: Number(high.toFixed(2)),
    low: Number(low.toFixed(2)),
    open: Number(open.toFixed(2)),
    previousClose: Number(previousClose.toFixed(2)),
  };
}

const basePrices: Record<string, number> = {
  'AAPL': 178.50,
  'GOOGL': 142.30,
  'MSFT': 415.20,
  'AMZN': 175.80,
  'TSLA': 248.50,
  'META': 485.60,
  'NVDA': 875.20,
  'NFLX': 625.40,
};

export async function getStockQuote(symbol: string): Promise<StockQuote> {
  await new Promise(resolve => setTimeout(resolve, 100));

  const upperSymbol = symbol.toUpperCase();
  const basePrice = basePrices[upperSymbol] || 100;

  return generateRealisticPrice(upperSymbol, basePrice);
}

export async function searchStocks(query: string): Promise<Array<{ symbol: string; name: string }>> {
  await new Promise(resolve => setTimeout(resolve, 50));

  const stockData: Record<string, string> = {
    'AAPL': 'Apple Inc.',
    'GOOGL': 'Alphabet Inc.',
    'MSFT': 'Microsoft Corporation',
    'AMZN': 'Amazon.com Inc.',
    'TSLA': 'Tesla Inc.',
    'META': 'Meta Platforms Inc.',
    'NVDA': 'NVIDIA Corporation',
    'NFLX': 'Netflix Inc.',
  };

  const upperQuery = query.toUpperCase();

  return Object.entries(stockData)
    .filter(([symbol, name]) =>
      symbol.includes(upperQuery) || name.toLowerCase().includes(query.toLowerCase())
    )
    .map(([symbol, name]) => ({ symbol, name }));
}

export function getPopularStocks(): string[] {
  return POPULAR_STOCKS;
}

export class StockPriceStream {
  private callbacks: Map<string, (quote: StockQuote) => void> = new Map();
  private intervals: Map<string, number> = new Map();

  subscribe(symbol: string, callback: (quote: StockQuote) => void): () => void {
    const upperSymbol = symbol.toUpperCase();
    this.callbacks.set(upperSymbol, callback);

    const updatePrice = async () => {
      const quote = await getStockQuote(upperSymbol);
      const cb = this.callbacks.get(upperSymbol);
      if (cb) {
        cb(quote);
      }
    };

    updatePrice();

    const interval = window.setInterval(updatePrice, 3000);
    this.intervals.set(upperSymbol, interval);

    return () => {
      this.callbacks.delete(upperSymbol);
      const intervalId = this.intervals.get(upperSymbol);
      if (intervalId) {
        clearInterval(intervalId);
        this.intervals.delete(upperSymbol);
      }
    };
  }

  unsubscribeAll(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    this.callbacks.clear();
  }
}
