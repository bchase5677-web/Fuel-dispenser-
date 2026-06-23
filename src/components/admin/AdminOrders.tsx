import { useStore, Order } from '../../store/useStore';
import { Eye, Edit } from 'lucide-react';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-white">Track Orders</h3>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400 whitespace-nowrap">
            <thead className="text-xs uppercase bg-black/50 text-gray-500 border-b border-white/5">
              <tr>
                <th className="px-4 py-4 font-medium">Order ID</th>
                <th className="px-4 py-4 font-medium">Date</th>
                <th className="px-4 py-4 font-medium">Customer</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium">Total</th>
                <th className="px-4 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 text-white font-mono">{order.id}</td>
                  <td className="px-4 py-4">{order.date}</td>
                  <td className="px-4 py-4 text-white">{order.customerName}</td>
                  <td className="px-4 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className={`px-2 py-1 rounded text-xs border appearance-none cursor-pointer outline-none ${
                        order.status === 'Completed' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                        order.status === 'Pending' ? 'border-luxury-gold/30 text-luxury-gold bg-luxury-gold/10' :
                        order.status === 'Cancelled' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                        'border-blue-500/30 text-blue-400 bg-blue-500/10'
                      }`}
                    >
                      <option className="bg-luxury-black text-white" value="Pending">Pending</option>
                      <option className="bg-luxury-black text-white" value="Processing">Processing</option>
                      <option className="bg-luxury-black text-white" value="Completed">Completed</option>
                      <option className="bg-luxury-black text-white" value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-4 text-white">₦{order.total.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
