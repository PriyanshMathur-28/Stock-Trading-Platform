import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface Order {
  id: string;
  symbol: string;
  order_type: string;
  quantity: number;
  price: number;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'PENDING':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'CANCELLED':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-emerald-600 bg-emerald-50';
      case 'PENDING':
        return 'text-amber-600 bg-amber-50';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
        <p className="text-slate-500 mt-1">View your order history and status</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <Clock className="w-16 h-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No Orders Yet</h3>
            <p className="text-slate-500">Your order history will appear here once you start trading</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">Total</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-slate-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(order.created_at).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{order.symbol}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          order.order_type === 'BUY'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {order.order_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-slate-800">{order.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-slate-800">₹{order.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-semibold text-slate-800">
                        ₹{(order.quantity * order.price).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
