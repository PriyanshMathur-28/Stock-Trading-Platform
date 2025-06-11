import React, { createContext, useState, useContext, useEffect } from 'react';
import stockApiService from '../services/stockApi.service';

const StockContext = createContext();

// Default stocks to track
const DEFAULT_STOCKS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'V', 'JNJ'];
const UPDATE_INTERVAL = 300000; // 5 minutes in milliseconds

export const StockProvider = ({ children }) => {
    const [stockData, setStockData] = useState({
        latestPrices: [],
        profiles: [],
        performance: [],
        technicalIndicators: [],
        fundamentals: [],
        financials: [],
        historicalData: {},
        marketTrends: [],
        marketNews: [],
        loading: true,
        error: null,
        lastUpdated: null
    });

    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('watchlist');
        return saved ? JSON.parse(saved) : DEFAULT_STOCKS;
    });

    // Save watchlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    // Fetch all stock data
    const fetchAllStockData = async () => {
        try {
            setStockData(prev => ({ ...prev, loading: true, error: null }));

            console.log('Fetching stock data for:', watchlist);

            const [
                prices, 
                profiles, 
                performance,
                fundamentals,
                marketTrends,
                marketNews
            ] = await Promise.all([
                stockApiService.getLatestPrices(watchlist),
                stockApiService.getStockProfiles(watchlist),
                stockApiService.getPerformance(watchlist),
                stockApiService.getFundamental(watchlist),
                stockApiService.getMarketTrends(watchlist.join(',')),
                stockApiService.getMarketNews()
            ]);

            // Fetch technical indicators for each stock
            const technicalPromises = watchlist.map(symbol => 
                stockApiService.getTechnicalIndicators(symbol)
            );
            const technical = await Promise.all(technicalPromises);

            // Get historical data for charts (last 6 months)
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            const fromDate = sixMonthsAgo.toISOString().split('T')[0];
            const toDate = new Date().toISOString().split('T')[0];

            const historicalPromises = watchlist.map(symbol =>
                stockApiService.getHistoricalData(symbol, 'D', fromDate, toDate)
            );
            const historical = await Promise.all(historicalPromises);

            const historicalData = {};
            watchlist.forEach((symbol, index) => {
                historicalData[symbol] = historical[index].response || [];
            });

            setStockData({
                latestPrices: prices.response || [],
                profiles: profiles.response || [],
                performance: performance.response || [],
                technicalIndicators: technical.map(t => t.response) || [],
                fundamentals: fundamentals.response || [],
                financials: [],
                historicalData,
                marketTrends: marketTrends.response || [],
                marketNews: marketNews || [],
                loading: false,
                error: null,
                lastUpdated: new Date().toISOString()
            });

            console.log('Stock data updated successfully');
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setStockData(prev => ({
                ...prev,
                loading: false,
                error: error.message
            }));
        }
    };

    // Add stock to watchlist
    const addToWatchlist = (symbol) => {
        const upperSymbol = symbol.toUpperCase();
        if (!watchlist.includes(upperSymbol)) {
            setWatchlist([...watchlist, upperSymbol]);
        }
    };

    // Remove stock from watchlist
    const removeFromWatchlist = (symbol) => {
        setWatchlist(watchlist.filter(s => s !== symbol));
    };

    // Get time until next update
    const getTimeUntilNextUpdate = () => {
        if (!stockData.lastUpdated) return 0;
        const lastUpdate = new Date(stockData.lastUpdated).getTime();
        const nextUpdate = lastUpdate + UPDATE_INTERVAL;
        const now = new Date().getTime();
        return Math.max(0, nextUpdate - now);
    };

    // Initial fetch and setup interval
    useEffect(() => {
        fetchAllStockData();
        
        // Set up periodic updates
        const interval = setInterval(fetchAllStockData, UPDATE_INTERVAL);
        
        return () => clearInterval(interval);
    }, [watchlist]);

    const value = {
        ...stockData,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        refreshData: fetchAllStockData,
        getTimeUntilNextUpdate
    };

    return (
        <StockContext.Provider value={value}>
            {children}
        </StockContext.Provider>
    );
};

// Custom hook to use stock context
export const useStock = () => {
    const context = useContext(StockContext);
    if (!context) {
        throw new Error('useStock must be used within a StockProvider');
    }
    return context;
};

export default StockContext;