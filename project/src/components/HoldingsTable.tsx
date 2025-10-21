interface Holding {
  id: string;
  symbol: string;
  company_name: string;
  quantity: number;
  average_price: number;
  current_price: number;
}

interface Props {
  holdings: Holding[];
}

export default function HoldingsTable({ holdings }: Props) {
  if (holdings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <p className="text-slate-500">No holdings yet. Start trading to see your portfolio here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">Your Holdings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                Avg Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                P&L
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {holdings.map((holding) => {
              const pnl = (holding.current_price - holding.average_price) * holding.quantity;
              const pnlPercent = ((holding.current_price - holding.average_price) / holding.average_price) * 100;

              return (
                <tr key={holding.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-800">{holding.symbol}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600">{holding.company_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-slate-800">{holding.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-slate-800">₹{holding.average_price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-slate-800">
                      ₹{holding.current_price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`text-sm font-semibold ${pnl >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)}
                    </div>
                    <div className={`text-xs ${pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
