import React from 'react';
import { Wallet, TrendingUp, DollarSign } from 'lucide-react';

interface PortfolioSummaryProps {
  balance: number;
  portfolioValue: number;
  totalValue: number;
}

export function PortfolioSummary({ balance, portfolioValue, totalValue }: PortfolioSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-100 rounded-lg p-2">
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-600">Cash Balance</span>
        </div>
        <div className="text-3xl font-bold text-gray-900">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-100 rounded-lg p-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-sm font-medium text-gray-600">Portfolio Value</span>
        </div>
        <div className="text-3xl font-bold text-gray-900">
          ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-100 rounded-lg p-2">
            <DollarSign className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-sm font-medium text-gray-600">Total Value</span>
        </div>
        <div className="text-3xl font-bold text-gray-900">
          ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
}
