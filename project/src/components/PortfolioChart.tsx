import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface HistoryPoint {
  recorded_at: string;
  portfolio_value: number;
}

export default function PortfolioChart() {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const { data: history, error } = await supabase
        .from('portfolio_history')
        .select('*')
        .eq('user_id', user!.id)
        .order('recorded_at', { ascending: true })
        .limit(30);

      if (error) throw error;

      if (!history || history.length === 0) {
        await generateInitialHistory();
        return;
      }

      const formatted = history.map((point) => ({
        time: new Date(point.recorded_at).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        value: parseFloat(point.portfolio_value.toString()),
      }));

      setData(formatted);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateInitialHistory = async () => {
    const points = [];
    const baseValue = 100000;
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 30 * 60000);
      const variation = (Math.random() - 0.5) * 2000;
      const value = baseValue + variation + (29 - i) * 50;

      points.push({
        user_id: user!.id,
        portfolio_value: value,
        recorded_at: time.toISOString(),
      });
    }

    await supabase.from('portfolio_history').insert(points);
    await fetchHistory();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-80 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Portfolio Performance</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Value']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
