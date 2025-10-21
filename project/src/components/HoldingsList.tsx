import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Holding } from '../services/tradingService';
import { StockQuote } from '../services/stockApi';
import { TradeModal } from './TradeModal';

interface HoldingsListProps {
  holdings: Holding[];
  holdingPrices: Map<string, StockQuote>;
  userId: string;
  onTradeComplete: () => void;
}

export function HoldingsList({ holdings, holdingPrices, userId, onTradeComplete }: HoldingsListProps) {
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);
  const [showTradeModal, setShowTradeModal] = useState(false);

  if (holdings.length === 0) {
    return (
      <div className="text-center py-12">
         <img src="logo.jpg" style={{height:"40px"}}></img>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No Holdings Yet</h3>
        <p className="text-gray-600">Start trading to build your portfolio</p>
      </div>
    );
  }

  const handleTradeClick = (holding: Holding) => {
    setSelectedHolding(holding);
    setShowTradeModal(true);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Holdings</h3>
      <div className="space-y-4">
        {holdings.map((holding) => {
          const currentPrice = holdingPrices.get(holding.symbol);
          const costBasis = Number(holding.average_price) * Number(holding.quantity);
          const currentValue = (currentPrice?.price || Number(holding.average_price)) * Number(holding.quantity);
          const gainLoss = currentValue - costBasis;
          const gainLossPercent = (gainLoss / costBasis) * 100;

          return (
            <div
              key={holding.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{holding.symbol}</h4>
                  <p className="text-sm text-gray-600">
                    {Number(holding.quantity)} shares @ ${Number(holding.average_price).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold text-gray-900">
                    ${(currentPrice?.price || Number(holding.average_price)).toFixed(2)}
                  </div>
                  {currentPrice && (
                    <div className={`flex items-center gap-1 justify-end text-sm ${
                      currentPrice.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {currentPrice.change >= 0 ? (
                        <img src="logo.jpg" style={{height:"40px"}}></img>
                      ) : (
                        <img src="logo.jpg" style={{height:"40px"}}></img>
                      )}
                      <span className="font-medium">
                        {currentPrice.change >= 0 ? '+' : ''}
                        {currentPrice.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3 py-3 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Cost Basis</div>
                  <div className="font-semibold text-gray-900">
                    ${costBasis.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Current Value</div>
                  <div className="font-semibold text-gray-900">
                    ${currentValue.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Gain/Loss</div>
                  <div className={`font-semibold ${
                    gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)}
                    <span className="text-xs ml-1">
                      ({gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleTradeClick(holding)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Trade
              </button>
            </div>
          );
        })}
      </div>

      {showTradeModal && selectedHolding && (
        <TradeModal
          symbol={selectedHolding.symbol}
          currentPrice={holdingPrices.get(selectedHolding.symbol)?.price || Number(selectedHolding.average_price)}
          userId={userId}
          availableBalance={0}
          existingHolding={Number(selectedHolding.quantity)}
          onClose={() => {
            setShowTradeModal(false);
            setSelectedHolding(null);
          }}
          onTradeComplete={() => {
            setShowTradeModal(false);
            setSelectedHolding(null);
            onTradeComplete();
          }}
        />
      )}
    </div>
  );
}
