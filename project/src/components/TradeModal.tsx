import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  onClose: () => void;
}

const POPULAR_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2450.75 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3678.90 },
  { symbol: 'INFY', name: 'Infosys Limited', price: 1456.30 },
  { symbol: 'HDFC', name: 'HDFC Bank Limited', price: 1678.45 },
  { symbol: 'ICICI', name: 'ICICI Bank Limited', price: 987.60 },
  { symbol: 'BHARTI', name: 'Bharti Airtel Limited', price: 876.25 },
  { symbol: 'ITC', name: 'ITC Limited', price: 456.80 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 567.90 },
];

export default function TradeModal({ onClose }: Props) {
  const { user } = useAuth();
  const [selectedStock, setSelectedStock] = useState(POPULAR_STOCKS[0]);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrade = async () => {
    if (quantity <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (orderType === 'BUY') {
        const { data: existingHolding } = await supabase
          .from('holdings')
          .select('*')
          .eq('user_id', user!.id)
          .eq('symbol', selectedStock.symbol)
          .maybeSingle();

        if (existingHolding) {
          const newQuantity = existingHolding.quantity + quantity;
          const newAvgPrice =
            (existingHolding.average_price * existingHolding.quantity + selectedStock.price * quantity) /
            newQuantity;

          await supabase
            .from('holdings')
            .update({
              quantity: newQuantity,
              average_price: newAvgPrice,
              current_price: selectedStock.price,
            })
            .eq('id', existingHolding.id);
        } else {
          await supabase.from('holdings').insert({
            user_id: user!.id,
            symbol: selectedStock.symbol,
            company_name: selectedStock.name,
            quantity,
            average_price: selectedStock.price,
            current_price: selectedStock.price,
          });
        }
      } else {
        const { data: existingHolding } = await supabase
          .from('holdings')
          .select('*')
          .eq('user_id', user!.id)
          .eq('symbol', selectedStock.symbol)
          .maybeSingle();

        if (!existingHolding) {
          setError('You do not own this stock');
          setLoading(false);
          return;
        }

        if (existingHolding.quantity < quantity) {
          setError('Insufficient quantity');
          setLoading(false);
          return;
        }

        const newQuantity = existingHolding.quantity - quantity;

        if (newQuantity === 0) {
          await supabase.from('holdings').delete().eq('id', existingHolding.id);
        } else {
          await supabase
            .from('holdings')
            .update({ quantity: newQuantity })
            .eq('id', existingHolding.id);
        }
      }

      await supabase.from('orders').insert({
        user_id: user!.id,
        symbol: selectedStock.symbol,
        order_type: orderType,
        quantity,
        price: selectedStock.price,
        status: 'COMPLETED',
      });

      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Place Order</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <button
              onClick={() => setOrderType('BUY')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                orderType === 'BUY'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => setOrderType('SELL')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                orderType === 'SELL'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              SELL
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Stock
            </label>
            <div className="grid grid-cols-2 gap-3">
              {POPULAR_STOCKS.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => setSelectedStock(stock)}
                  className={`p-4 rounded-lg border-2 text-left transition ${
                    selectedStock.symbol === stock.symbol
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-800">{stock.symbol}</div>
                  <div className="text-xs text-slate-500 mb-1">{stock.name}</div>
                  <div className="text-sm font-medium text-slate-700">₹{stock.price}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Price per share</span>
              <span className="font-semibold text-slate-800">₹{selectedStock.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Quantity</span>
              <span className="font-semibold text-slate-800">{quantity}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between">
              <span className="font-medium text-slate-800">Total Amount</span>
              <span className="font-bold text-slate-900">
                ₹{(selectedStock.price * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleTrade}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              orderType === 'BUY'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? 'Processing...' : `${orderType} ${selectedStock.symbol}`}
          </button>
        </div>
      </div>
    </div>
  );
}
