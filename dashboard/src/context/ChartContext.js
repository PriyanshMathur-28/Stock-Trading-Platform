import React, { createContext, useState, useContext, useEffect } from 'react';
import { useStock } from './StockContext';

const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
    const { 
        latestPrices, 
        historicalData, 
        performance, 
        fundamentals,
        watchlist,
        lastUpdated 
    } = useStock();

    const [chartData, setChartData] = useState({
        holdingsData: null,
        performanceData: null,
        portfolioDistribution: null,
        sectorDistribution: null
    });

    // Process data for holdings vertical chart
    const processHoldingsData = () => {
        if (!latestPrices || !fundamentals) return null;

        const labels = watchlist;
        const values = watchlist.map(symbol => {
            const price = latestPrices.find(p => p.s === symbol);
            return price ? parseFloat(price.c) : 0;
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Current Price',
                    data: values,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderColor: 'rgb(53, 162, 235)',
                    borderWidth: 1
                }
            ]
        };
    };

    // Process data for performance chart
    const processPerformanceData = () => {
        if (!historicalData || !watchlist.length) return null;

        const firstSymbol = watchlist[0];
        const data = historicalData[firstSymbol];
        if (!data) return null;

        const dates = data.map(item => new Date(item.date).toLocaleDateString());
        const prices = data.map(item => item.close);

        return {
            labels: dates,
            datasets: [
                {
                    label: 'Stock Price',
                    data: prices,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        };
    };

    // Process data for portfolio distribution doughnut chart
    const processPortfolioDistribution = () => {
        if (!latestPrices || !fundamentals) return null;

        const data = watchlist.map(symbol => {
            const price = latestPrices.find(p => p.s === symbol);
            return price ? parseFloat(price.c) : 0;
        });

        const total = data.reduce((acc, val) => acc + val, 0);
        const percentages = data.map(value => ((value / total) * 100).toFixed(2));

        return {
            labels: watchlist,
            datasets: [
                {
                    data: percentages,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                }
            ]
        };
    };

    // Process data for sector distribution doughnut chart
    const processSectorDistribution = () => {
        if (!fundamentals) return null;

        const sectors = {};
        fundamentals.forEach(stock => {
            const sector = stock.sector || 'Unknown';
            sectors[sector] = (sectors[sector] || 0) + 1;
        });

        return {
            labels: Object.keys(sectors),
            datasets: [
                {
                    data: Object.values(sectors),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                }
            ]
        };
    };

    // Update chart data whenever stock data changes
    useEffect(() => {
        setChartData({
            holdingsData: processHoldingsData(),
            performanceData: processPerformanceData(),
            portfolioDistribution: processPortfolioDistribution(),
            sectorDistribution: processSectorDistribution()
        });
    }, [latestPrices, historicalData, performance, fundamentals, watchlist, lastUpdated]);

    const value = {
        ...chartData,
        lastUpdated
    };

    return (
        <ChartContext.Provider value={value}>
            {children}
        </ChartContext.Provider>
    );
};

// Custom hook to use chart context
export const useCharts = () => {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error('useCharts must be used within a ChartProvider');
    }
    return context;
};

export default ChartContext; 