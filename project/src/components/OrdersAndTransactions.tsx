import React, { useEffect, useState } from 'react';
import { getUserOrders, getUserTransactions, Order, Transaction } from '../services/tradingService';
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';

interface OrdersAndTransactionsProps {
  userId: string;
}

export function OrdersAndTransactions({ userId }: OrdersAndTransactionsProps) {
  const [view, setView] = useState<'orders' | 'transactions'>('transactions');
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [ordersData, transactionsData] = await Promise.all([
          getUserOrders(userId),
          getUserTransactions(userId),
        ]);
        setOrders(ordersData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error loading history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  }

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView('transactions')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            view === 'transactions'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Transactions
        </button>
        <button
          onClick={() => setView('orders')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            view === 'orders'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Orders
        </button>
      </div>

      {view === 'transactions' && (
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <DollarSign className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No Transactions Yet</h3>
              <p className="text-gray-600">Your transaction history will appear here</p>
            </div>
          ) : (
            transactions.map((transaction) => {
              const isBuy = transaction.transaction_type === 'buy';
              const isSell = transaction.transaction_type === 'sell';
              const isDeposit = transaction.transaction_type === 'deposit';
              const isWithdraw = transaction.transaction_type === 'withdraw';

              return (
                <div
                  key={transaction.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${
                      isBuy ? 'bg-green-100' :
                      isSell ? 'bg-red-100' :
                      isDeposit ? 'bg-blue-100' : 'bg-orange-100'
                    }`}>
                      {isBuy || isDeposit ? (
                        <ArrowDownCircle className={`w-5 h-5 ${
                          isBuy ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      ) : (
                        <ArrowUpCircle className={`w-5 h-5 ${
                          isSell ? 'text-red-600' : 'text-orange-600'
                        }`} />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="font-semibold text-gray-900 capitalize">
                            {transaction.transaction_type}
                            {transaction.symbol && ` ${transaction.symbol}`}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(transaction.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${
                            isDeposit || isSell ? 'text-green-600' : 'text-gray-900'
                          }`}>
                            {isDeposit || isSell ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {transaction.quantity && transaction.price && (
                        <div className="text-sm text-gray-600 mt-1">
                          {transaction.quantity} shares @ ${transaction.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {view === 'orders' && (
        <div className="space-y-3">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <DollarSign className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No Orders Yet</h3>
              <p className="text-gray-600">Your order history will appear here</p>
            </div>
          ) : (
            orders.map((order) => {
              const isBuy = order.order_type === 'buy';

              return (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${
                      isBuy ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {isBuy ? (
                        <ArrowDownCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {isBuy ? 'Buy' : 'Sell'} {order.symbol}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {order.status}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                        <div>
                          <div className="text-gray-600">Quantity</div>
                          <div className="font-semibold text-gray-900">
                            {order.quantity} shares
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Price</div>
                          <div className="font-semibold text-gray-900">
                            ${order.price.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Total</div>
                          <div className="font-semibold text-gray-900">
                            ${order.total_amount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
