import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { depositFunds, withdrawFunds } from '../services/tradingService';

interface FundManagementProps {
  userId: string;
  currentBalance: number;
  onFundsUpdate: () => void;
}

export function FundManagement({ userId, currentBalance, onFundsUpdate }: FundManagementProps) {
  const [action, setAction] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const amountNum = Number(amount);

    if (amountNum <= 0) {
      setError('Amount must be greater than 0');
      setLoading(false);
      return;
    }

    if (action === 'withdraw' && amountNum > currentBalance) {
      setError('Insufficient funds');
      setLoading(false);
      return;
    }

    const result = action === 'deposit'
      ? await depositFunds(userId, amountNum)
      : await withdrawFunds(userId, amountNum);

    setLoading(false);

    if (result.success) {
      setSuccess(result.message);
      setAmount('');
      onFundsUpdate();
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Manage Funds</h3>

      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-6 text-white mb-6">
        <div className="text-sm text-slate-300 mb-1">Available Balance</div>
        <div className="text-4xl font-bold">
          ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => {
              setAction('deposit');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
              action === 'deposit'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Plus className="w-5 h-5" />
            Deposit
          </button>
          <button
            onClick={() => {
              setAction('withdraw');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
              action === 'withdraw'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Minus className="w-5 h-5" />
            Withdraw
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                required
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAmount('100')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
            >
              $100
            </button>
            <button
              type="button"
              onClick={() => setAmount('500')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
            >
              $500
            </button>
            <button
              type="button"
              onClick={() => setAmount('1000')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
            >
              $1,000
            </button>
            <button
              type="button"
              onClick={() => setAmount('5000')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
            >
              $5,000
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !amount || Number(amount) <= 0}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              action === 'deposit'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
          >
            {loading
              ? 'Processing...'
              : action === 'deposit'
              ? 'Deposit Funds'
              : 'Withdraw Funds'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Fund Management Info</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• New accounts start with $10,000 in virtual funds</li>
            <li>• Deposits and withdrawals are instant</li>
            <li>• All funds are simulated for practice trading</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
