import React, { createContext, useState, useContext, useEffect } from 'react';
import stockApiService from '../services/stockApi.service';

const StockContext = createContext();

// Default stocks to track
const DEFAULT_STOCKS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];
const UPDATE_INTERVAL = 5400000; // 1.5 hours in milliseconds

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
        loading: true,
        error: null,
        lastUpdated: null
    });

    const [watchlist, setWatchlist] = useState(DEFAULT_STOCKS);

    // Fetch all stock data
    const fetchAllStockData = async () => {
        try {
            setStockData(prev => ({ ...prev, loading: true, error: null }));

            const [
                prices, 
                profiles, 
                performance,
                fundamentals,
                marketTrends
            ] = await Promise.all([
                stockApiService.getLatestPrices(watchlist),
                stockApiService.getStockProfiles(watchlist),
                stockApiService.getPerformance(watchlist),
                stockApiService.getFundamental(watchlist),
                stockApiService.getMarketTrends(watchlist.join(','))
            ]);

            // Fetch technical indicators and financial data for each stock
            const technicalPromises = watchlist.map(symbol => 
                stockApiService.getTechnicalIndicators(symbol)
            );
            const financialPromises = watchlist.map(symbol =>
                stockApiService.getFinancialData(symbol)
            );

            const [technical, financials] = await Promise.all([
                Promise.all(technicalPromises),
                Promise.all(financialPromises)
            ]);

            // Get historical data for charts (last 6 months)
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            const fromDate = sixMonthsAgo.toISOString().split('T')[0];
            const toDate = new Date().toISOString().split('T')[0];

            const historicalPromises = watchlist.map(symbol =>
                stockApiService.getHistoricalData(symbol, '1d', fromDate, toDate)
            );
            const historical = await Promise.all(historicalPromises);

            const historicalData = {};
            watchlist.forEach((symbol, index) => {
                historicalData[symbol] = historical[index].response || {};
            });

            setStockData({
                latestPrices: prices.response || [],
                profiles: profiles.response || [],
                performance: performance.response || [],
                technicalIndicators: technical.map(t => t.response) || [],
                fundamentals: fundamentals.response || [],
                financials: financials || [],
                historicalData,
                marketTrends: marketTrends.response || [],
                loading: false,
                error: null,
                lastUpdated: new Date().toISOString()
            });
        } catch (error) {
            setStockData(prev => ({
                ...prev,
                loading: false,
                error: error.message
            }));
        }
    };

    // Add stock to watchlist
    const addToWatchlist = (symbol) => {
        if (!watchlist.includes(symbol)) {
            setWatchlist([...watchlist, symbol]);
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