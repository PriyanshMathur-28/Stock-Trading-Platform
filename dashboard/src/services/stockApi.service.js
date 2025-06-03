import axios from 'axios';

const FINNHUB_API_KEY = 'd0vh3d9r01qkepd07c70d0vh3d9r01qkepd07c7g';
const BASE_URL = 'https://finnhub.io/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    token: FINNHUB_API_KEY
  }
});

const stockApiService = {
  getLatestPrices: async (symbols) => {
    try {
      const promises = symbols.map(symbol => 
        api.get(`/quote`, { params: { symbol } })
      );
      
      const results = await Promise.all(promises);
      return results.map((result, index) => ({
        s: symbols[index],
        c: result.data.c,
        h: result.data.h,
        l: result.data.l,
        o: result.data.o,
        pc: result.data.pc,
        ch: (result.data.c - result.data.pc).toFixed(2),
        cp: ((result.data.c - result.data.pc) / result.data.pc * 100).toFixed(2)
      }));
    } catch (error) {
      console.error('Error fetching stock prices:', error);
      return [];
    }
  },

  getStockProfile: async (symbol) => {
    try {
      const response = await api.get(`/stock/profile2`, { params: { symbol } });
      return response.data;
    } catch (error) {
      console.error('Error fetching stock profile:', error);
      return null;
    }
  },

  getHistoricalData: async (symbol, resolution = 'D', from, to) => {
    try {
      const response = await api.get(`/stock/candle`, {
        params: { symbol, resolution, from, to }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return null;
    }
  },

  getMarketNews: async () => {
    try {
      const response = await api.get(`/news`, { params: { category: 'general' } });
      return response.data;
    } catch (error) {
      console.error('Error fetching market news:', error);
      return [];
    }
  },

  getCompanyNews: async (symbol, from, to) => {
    try {
      const response = await api.get(`/company-news`, {
        params: { symbol, from, to }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching company news:', error);
      return [];
    }
  }
};

export default stockApiService;