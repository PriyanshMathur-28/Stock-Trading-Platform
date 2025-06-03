import React, { useState } from 'react';
import { useStock } from '../context/StockContext';
import { 
    Box, 
    Typography, 
    Paper, 
    IconButton, 
    TextField, 
    CircularProgress,
    Tooltip,
    Chip,
    Collapse,
    Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const WatchList = () => {
    const { 
        latestPrices, 
        profiles, 
        performance,
        technicalIndicators,
        fundamentals,
        marketTrends,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        loading,
        error,
        lastUpdated,
        refreshData,
        getTimeUntilNextUpdate
    } = useStock();

    const [newSymbol, setNewSymbol] = useState('');
    const [expandedStock, setExpandedStock] = useState(null);
    const [timeUntilUpdate, setTimeUntilUpdate] = useState(getTimeUntilNextUpdate());

    // Update the countdown timer every minute
    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeUntilUpdate(getTimeUntilNextUpdate());
        }, 60000);

        return () => clearInterval(timer);
    }, [getTimeUntilNextUpdate]);

    const formatTimeUntilUpdate = () => {
        const minutes = Math.floor(timeUntilUpdate / 60000);
        if (minutes < 1) return 'Less than a minute';
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    };

    const handleAddStock = () => {
        if (newSymbol) {
            addToWatchlist(newSymbol.toUpperCase());
            setNewSymbol('');
        }
    };

    const handleExpand = (symbol) => {
        setExpandedStock(expandedStock === symbol ? null : symbol);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={2}>
                <Typography color="error">Error: {error}</Typography>
                <Button 
                    startIcon={<RefreshIcon />} 
                    onClick={refreshData}
                    variant="contained" 
                    sx={{ mt: 2 }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box p={2}>
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="h6" component="h2">Watchlist</Typography>
                <Box ml="auto" display="flex" alignItems="center" gap={2}>
                    <Tooltip title="Next update in">
                        <Chip 
                            label={`Update in: ${formatTimeUntilUpdate()}`}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    </Tooltip>
                    <TextField
                        size="small"
                        placeholder="Add symbol"
                        value={newSymbol}
                        onChange={(e) => setNewSymbol(e.target.value)}
                    />
                    <IconButton onClick={handleAddStock}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>

            {watchlist.map((symbol) => {
                const price = latestPrices.find(p => p.s === symbol);
                const profile = profiles.find(p => p.symbol === symbol);
                const perf = performance.find(p => p.symbol === symbol);
                const technical = technicalIndicators.find(t => t.symbol === symbol);
                const fundamental = fundamentals?.find(f => f.symbol === symbol);
                const trend = marketTrends?.find(t => t.symbol === symbol);

                if (!price) return null;

                const isPositive = parseFloat(price.ch) > 0;

                return (
                    <Paper key={symbol} elevation={1} sx={{ p: 2, mb: 1 }}>
                        <Box display="flex" alignItems="center">
                            <Box flex={1}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {symbol}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {profile?.full_name || symbol}
                                </Typography>
                            </Box>

                            <Box textAlign="right" mr={2}>
                                <Typography variant="h6">
                                    ${parseFloat(price.c).toFixed(2)}
                                </Typography>
                                <Box display="flex" alignItems="center" justifyContent="flex-end">
                                    {isPositive ? (
                                        <TrendingUpIcon color="success" fontSize="small" />
                                    ) : (
                                        <TrendingDownIcon color="error" fontSize="small" />
                                    )}
                                    <Typography 
                                        variant="body2" 
                                        color={isPositive ? "success.main" : "error.main"}
                                    >
                                        {price.cp}%
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <IconButton 
                                    size="small" 
                                    onClick={() => handleExpand(symbol)}
                                >
                                    {expandedStock === symbol ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                                <IconButton 
                                    size="small" 
                                    onClick={() => removeFromWatchlist(symbol)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={expandedStock === symbol}>
                            <Box mt={2}>
                                {/* Performance Metrics */}
                                <Typography variant="subtitle2" gutterBottom>Performance</Typography>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Chip 
                                        label={`Day: ${perf?.daily || '0'}%`}
                                        size="small"
                                        color={parseFloat(perf?.daily) > 0 ? "success" : "error"}
                                        variant="outlined"
                                    />
                                    <Chip 
                                        label={`Week: ${perf?.week || '0'}%`}
                                        size="small"
                                        color={parseFloat(perf?.week) > 0 ? "success" : "error"}
                                        variant="outlined"
                                    />
                                    <Chip 
                                        label={`Month: ${perf?.month || '0'}%`}
                                        size="small"
                                        color={parseFloat(perf?.month) > 0 ? "success" : "error"}
                                        variant="outlined"
                                    />
                                    <Chip 
                                        label={`YTD: ${perf?.ytd || '0'}%`}
                                        size="small"
                                        color={parseFloat(perf?.ytd) > 0 ? "success" : "error"}
                                        variant="outlined"
                                    />
                                </Box>

                                {/* Technical Indicators */}
                                {technical && (
                                    <>
                                        <Typography variant="subtitle2" gutterBottom>Technical Indicators</Typography>
                                        <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
                                            <Chip 
                                                label={`RSI: ${technical.rsi || 'N/A'}`}
                                                size="small"
                                                variant="outlined"
                                            />
                                            <Chip 
                                                label={`MACD: ${technical.macd || 'N/A'}`}
                                                size="small"
                                                variant="outlined"
                                            />
                                            <Chip 
                                                label={`SMA: ${technical.sma || 'N/A'}`}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </>
                                )}

                                {/* Market Trend */}
                                {trend && (
                                    <>
                                        <Typography variant="subtitle2" gutterBottom>Market Trend</Typography>
                                        <Box display="flex" gap={1} mb={1}>
                                            <Chip 
                                                label={trend.trend}
                                                size="small"
                                                color={trend.trend === 'Bullish' ? 'success' : 'error'}
                                            />
                                            <Chip 
                                                label={trend.signal}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </>
                                )}

                                {/* Fundamental Data */}
                                {fundamental && (
                                    <>
                                        <Typography variant="subtitle2" gutterBottom>Fundamentals</Typography>
                                        <Box display="flex" gap={1} flexWrap="wrap">
                                            <Chip 
                                                label={`P/E: ${fundamental.pe_ratio || 'N/A'}`}
                                                size="small"
                                                variant="outlined"
                                            />
                                            <Chip 
                                                label={`Market Cap: ${fundamental.market_cap || 'N/A'}`}
                                                size="small"
                                                variant="outlined"
                                            />
                                            <Chip 
                                                label={`Volume: ${fundamental.volume || 'N/A'}`}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Collapse>
                    </Paper>
                );
            })}

            {lastUpdated && (
                <Typography variant="caption" color="textSecondary" display="block" textAlign="right" mt={1}>
                    Last updated: {new Date(lastUpdated).toLocaleString()}
                </Typography>
            )}
        </Box>
    );
};

export default WatchList;
