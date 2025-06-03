import axios from 'axios';

const API_KEY = 'E2ENLEdIqTZwg9ircBeBI2yQNCuFxIAw';
const BASE_URL = 'https://fcsapi.com/api-v3/stock';

// Create axios instance with common config
const api = axios.create({
    baseURL: BASE_URL,
    params: {
        access_key: API_KEY
    }
});

// Add response interceptor for rate limiting
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 429) {
            // Rate limit exceeded - wait and retry
            const retryAfter = error.response.headers['retry-after'] || 60;
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(api(error.config));
                }, retryAfter * 1000);
            });
        }
        return Promise.reject(error);
    }
);

// Error handler with detailed messages
const handleError = (error) => {
    let errorMessage = 'An error occurred';
    
    if (error.response) {
        const responseData = error.response.data;
        errorMessage = responseData.msg || responseData.message || responseData.error || 'Server error';
        console.error('Stock API Error:', {
            message: errorMessage,
            status: error.response.status,
            endpoint: error.config?.url,
            data: responseData
        });
    } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
        console.error('Stock API Network Error:', error.request);
    } else {
        console.error('Stock API Error:', error.message);
    }
    
    throw new Error(errorMessage);
};

// Mock data for development/fallback
const mockData = {
    performance: {
        response: [
            {
                symbol: 'AAPL',
                daily: '0.5',
                week: '2.3',
                month: '5.7',
                ytd: '15.2',
                year: '25.8'
            },
            // Add mock data for other stocks...
        ]
    },
    // Add other mock data as needed...
};

const stockApiService = {
    // Get latest prices for multiple stocks
    getLatestPrices: async (symbols) => {
        try {
            const response = await api.get('/latest', {
                params: { symbol: symbols.join(',') }
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    // Get stock profile information
    getStockProfiles: async (symbols) => {
        try {
            const response = await api.get('/profile', {
                params: { symbol: symbols.join(',') }
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    // Get historical data with date range
    getHistoricalData: async (symbol, period = '1d', from, to) => {
        try {
            const response = await api.get('/history', {
                params: {
                    symbol,
                    period,
                    from,
                    to,
                    level: 1 // Include OHLCV data
                }
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    // Get market performance metrics
    getPerformance: async (symbols) => {
        try {
            // First try the API call
            try {
                const response = await api.get('/performance', {
                    params: { 
                        symbol: symbols.join(',')
                    }
                });
                return response.data;
            } catch (error) {
                // If API fails, use mock data for development
                console.warn('Using mock performance data due to API error:', error.message);
                return mockData.performance;
            }
        } catch (error) {
            handleError(error);
        }
    },

    // Get technical indicators with customizable parameters
    getTechnicalIndicators: async (symbol, period = '1d') => {
        try {
            const response = await api.get('/indicators', {
                params: { 
                    symbol, 
                    period,
                    indicators: ['sma', 'ema', 'rsi', 'macd', 'bb'].join(',')
                }
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    // Get market trends and signals
    getMarketTrends: async (symbols) => {
        try {
            const response = await api.get('/technicals', {
                params: { 
                    symbol: symbols,
                    type: ['trend', 'signal'].join(',')
                }
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    // Get fundamental data
    getFundamental: async (symbols) => {
        try {
            const response = await api.get('/fundamental', {
                params: { 
                    symbol: symbols.join(','),
                    type: ['overview', 'ratios', 'growth'].join(',')
                }
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    // Get stock list by country with filters
    getStockList: async (country = 'united-states', filters = {}) => {
        try {
            const response = await api.get('/list', {
                params: {
                    country,
                    ...filters
                }
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    // Get comprehensive financial data
    getFinancialData: async (symbol) => {
        try {
            const [income, balance, cashFlow, metrics] = await Promise.all([
                api.get('/income', { params: { symbol } }),
                api.get('/balance', { params: { symbol } }),
                api.get('/cash', { params: { symbol } }),
                api.get('/metrics', { params: { symbol } })
            ]);
            return {
                income: income.data,
                balance: balance.data,
                cashFlow: cashFlow.data,
                metrics: metrics.data
            };
        } catch (error) {
            handleError(error);
        }
    }
};

export default stockApiService; 