import axios from 'axios';

const FINNHUB_API_KEY = 'd0vh3d9r01qkepd07c70d0vh3d9r01qkepd07c7g';
const BASE_URL = 'https://finnhub.io/api/v1';
const ALPHA_VANTAGE_API_KEY = 'demo'; // Replace with your Alpha Vantage API key
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    token: FINNHUB_API_KEY
  }
});

const alphaVantageApi = axios.create({
  baseURL: ALPHA_VANTAGE_BASE_URL,
  params: {
    apikey: ALPHA_VANTAGE_API_KEY
  }
});

const stockApiService = {
  // Get latest stock prices
  getLatestPrices: async (symbols) => {
    try {
      const promises = symbols.map(symbol => 
        api.get(`/quote`, { params: { symbol } })
      );
      
      const results = await Promise.all(promises);
      const response = results.map((result, index) => ({
        s: symbols[index],
        c: result.data.c,
        h: result.data.h,
        l: result.data.l,
        o: result.data.o,
        pc: result.data.pc,
        ch: (result.data.c - result.data.pc).toFixed(2),
        cp: ((result.data.c - result.data.pc) / result.data.pc * 100).toFixed(2)
      }));

      return { response };
    } catch (error) {
      console.error('Error fetching stock prices:', error);
      return { response: [] };
    }
  },

  // Get stock profiles
  getStockProfiles: async (symbols) => {
    try {
      const promises = symbols.map(symbol => 
        api.get(`/stock/profile2`, { params: { symbol } })
      );
      
      const results = await Promise.all(promises);
      const response = results.map((result, index) => ({
        symbol: symbols[index],
        full_name: result.data.name || symbols[index],
        ...result.data
      }));

      return { response };
    } catch (error) {
      console.error('Error fetching stock profiles:', error);
      return { response: [] };
    }
  },

  // Get performance data
  getPerformance: async (symbols) => {
    try {
      const response = [];
      
      for (const symbol of symbols) {
        // Get historical data for performance calculation
        const endDate = Math.floor(Date.now() / 1000);
        const startDate = endDate - (365 * 24 * 60 * 60); // 1 year ago
        
        try {
          const historicalData = await api.get(`/stock/candle`, {
            params: {
              symbol,
              resolution: 'D',
              from: startDate,
              to: endDate
            }
          });

          if (historicalData.data.s === 'ok' && historicalData.data.c.length > 0) {
            const prices = historicalData.data.c;
            const currentPrice = prices[prices.length - 1];
            const dayAgoPrice = prices[prices.length - 2] || currentPrice;
            const weekAgoPrice = prices[Math.max(0, prices.length - 7)] || currentPrice;
            const monthAgoPrice = prices[Math.max(0, prices.length - 30)] || currentPrice;
            const yearAgoPrice = prices[0] || currentPrice;

            response.push({
              symbol,
              daily: ((currentPrice - dayAgoPrice) / dayAgoPrice * 100).toFixed(2),
              week: ((currentPrice - weekAgoPrice) / weekAgoPrice * 100).toFixed(2),
              month: ((currentPrice - monthAgoPrice) / monthAgoPrice * 100).toFixed(2),
              ytd: ((currentPrice - yearAgoPrice) / yearAgoPrice * 100).toFixed(2)
            });
          } else {
            response.push({
              symbol,
              daily: '0.00',
              week: '0.00',
              month: '0.00',
              ytd: '0.00'
            });
          }
        } catch (err) {
          response.push({
            symbol,
            daily: '0.00',
            week: '0.00',
            month: '0.00',
            ytd: '0.00'
          });
        }
      }

      return { response };
    } catch (error) {
      console.error('Error fetching performance data:', error);
      return { response: [] };
    }
  },

  // Get technical indicators
  getTechnicalIndicators: async (symbol) => {
    try {
      // Using Alpha Vantage for technical indicators
      const [rsiData, macdData, smaData] = await Promise.all([
        alphaVantageApi.get('', {
          params: {
            function: 'RSI',
            symbol,
            interval: 'daily',
            time_period: 14,
            series_type: 'close'
          }
        }).catch(() => ({ data: {} })),
        alphaVantageApi.get('', {
          params: {
            function: 'MACD',
            symbol,
            interval: 'daily',
            series_type: 'close'
          }
        }).catch(() => ({ data: {} })),
        alphaVantageApi.get('', {
          params: {
            function: 'SMA',
            symbol,
            interval: 'daily',
            time_period: 20,
            series_type: 'close'
          }
        }).catch(() => ({ data: {} }))
      ]);

      const response = {
        symbol,
        rsi: 'N/A',
        macd: 'N/A',
        sma: 'N/A'
      };

      // Parse RSI
      if (rsiData.data['Technical Analysis: RSI']) {
        const rsiValues = Object.values(rsiData.data['Technical Analysis: RSI']);
        if (rsiValues.length > 0) {
          response.rsi = parseFloat(rsiValues[0].RSI).toFixed(2);
        }
      }

      // Parse MACD
      if (macdData.data['Technical Analysis: MACD']) {
        const macdValues = Object.values(macdData.data['Technical Analysis: MACD']);
        if (macdValues.length > 0) {
          response.macd = parseFloat(macdValues[0].MACD).toFixed(4);
        }
      }

      // Parse SMA
      if (smaData.data['Technical Analysis: SMA']) {
        const smaValues = Object.values(smaData.data['Technical Analysis: SMA']);
        if (smaValues.length > 0) {
          response.sma = parseFloat(smaValues[0].SMA).toFixed(2);
        }
      }

      return { response };
    } catch (error) {
      console.error('Error fetching technical indicators:', error);
      return {
        response: {
          symbol,
          rsi: 'N/A',
          macd: 'N/A',
          sma: 'N/A'
        }
      };
    }
  },

  // Get fundamental data
  getFundamental: async (symbols) => {
    try {
      const promises = symbols.map(symbol => 
        api.get(`/stock/metric`, { params: { symbol, metric: 'all' } })
      );
      
      const results = await Promise.all(promises);
      const response = results.map((result, index) => ({
        symbol: symbols[index],
        pe_ratio: result.data.metric?.peBasicExclExtraTTM || 'N/A',
        market_cap: result.data.metric?.marketCapitalization || 'N/A',
        volume: result.data.metric?.averageVolume10Day || 'N/A',
        sector: result.data.metric?.sector || 'Technology',
        ...result.data.metric
      }));

      return { response };
    } catch (error) {
      console.error('Error fetching fundamental data:', error);
      return { response: [] };
    }
  },

  // Get financial data
  getFinancialData: async (symbol) => {
    try {
      const response = await api.get(`/stock/financials-reported`, {
        params: { symbol, freq: 'annual' }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching financial data:', error);
      return {};
    }
  },

  // Get historical data
  getHistoricalData: async (symbol, resolution = 'D', from, to) => {
    try {
      const fromTimestamp = Math.floor(new Date(from).getTime() / 1000);
      const toTimestamp = Math.floor(new Date(to).getTime() / 1000);
      
      const response = await api.get(`/stock/candle`, {
        params: { 
          symbol, 
          resolution, 
          from: fromTimestamp, 
          to: toTimestamp 
        }
      });
      
      if (response.data.s === 'ok') {
        const data = response.data.c.map((close, index) => ({
          date: new Date(response.data.t[index] * 1000).toISOString().split('T')[0],
          open: response.data.o[index],
          high: response.data.h[index],
          low: response.data.l[index],
          close: close,
          volume: response.data.v[index]
        }));
        
        return { response: data };
      }
      
      return { response: [] };
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return { response: [] };
    }
  },

  // Get market trends
  getMarketTrends: async (symbols) => {
    try {
      const symbolArray = symbols.split(',');
      const response = [];
      
      for (const symbol of symbolArray) {
        // Simple trend analysis based on recent price movement
        const quote = await api.get(`/quote`, { params: { symbol } });
        const changePercent = parseFloat(quote.data.dp) || 0;
        
        let trend = 'Neutral';
        let signal = 'Hold';
        
        if (changePercent > 2) {
          trend = 'Bullish';
          signal = 'Buy';
        } else if (changePercent < -2) {
          trend = 'Bearish';
          signal = 'Sell';
        }
        
        response.push({
          symbol,
          trend,
          signal,
          strength: Math.abs(changePercent).toFixed(2)
        });
      }
      
      return { response };
    } catch (error) {
      console.error('Error fetching market trends:', error);
      return { response: [] };
    }
  },

  // Get market news
  getMarketNews: async () => {
    try {
      const response = await api.get(`/news`, { 
        params: { category: 'general' } 
      });
      return response.data.slice(0, 10); // Return top 10 news items
    } catch (error) {
      console.error('Error fetching market news:', error);
      return [];
    }
  },

  // Get company news
  getCompanyNews: async (symbol, from, to) => {
    try {
      const response = await api.get(`/company-news`, {
        params: { symbol, from, to }
      });
      return response.data.slice(0, 5); // Return top 5 news items
    } catch (error) {
      console.error('Error fetching company news:', error);
      return [];
    }
  }
};

export default stockApiService;