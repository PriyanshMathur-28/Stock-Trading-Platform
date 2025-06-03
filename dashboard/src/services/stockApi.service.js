import axios from 'axios';
import finnhub from 'finnhub';

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

const stockApiService = {
    getLatestPrices: async (symbols) => {
        try {
            const promises = symbols.map(symbol => 
                new Promise((resolve) => {
                    finnhubClient.quote(symbol, (error, data) => {
                        resolve({ symbol, data, error });
                    });
                })
            );
            
            const results = await Promise.all(promises);
            return results.map(result => ({
                s: result.symbol,
                c: result.data?.c || 0,
                h: result.data?.h || 0,
                l: result.data?.l || 0,
                o: result.data?.o || 0,
                pc: result.data?.pc || 0,
                ch: ((result.data?.c - result.data?.pc) || 0).toFixed(2),
                cp: (((result.data?.c - result.data?.pc) / result.data?.pc * 100) || 0).toFixed(2)
            }));
        } catch (error) {
            console.error('Error fetching stock prices:', error);
            return [];
        }
    },

    getStockProfile: async (symbol) => {
        try {
            return new Promise((resolve) => {
                finnhubClient.companyProfile2({ 'symbol': symbol }, (error, data) => {
                    resolve(data);
                });
            });
        } catch (error) {
            console.error('Error fetching stock profile:', error);
            return null;
        }
    },

    getHistoricalData: async (symbol, resolution = 'D', from, to) => {
        try {
            return new Promise((resolve) => {
                finnhubClient.stockCandles(symbol, resolution, from, to, (error, data) => {
                    resolve(data);
                });
            });
        } catch (error) {
            console.error('Error fetching historical data:', error);
            return null;
        }
    },

    getMarketNews: async () => {
        try {
            return new Promise((resolve) => {
                finnhubClient.marketNews("general", {}, (error, data) => {
                    resolve(data);
                });
            });
        } catch (error) {
            console.error('Error fetching market news:', error);
            return [];
        }
    },

    getCompanyNews: async (symbol, from, to) => {
        try {
            return new Promise((resolve) => {
                finnhubClient.companyNews(symbol, from, to, (error, data) => {
                    resolve(data);
                });
            });
        } catch (error) {
            console.error('Error fetching company news:', error);
            return [];
        }
    }
};

export default stockApiService;