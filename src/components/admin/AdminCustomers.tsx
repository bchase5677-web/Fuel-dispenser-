import { useStore } from '../../store/useStore';
import { Mail, Phone } from 'lucide-react';

export default function AdminCustomers() {
  const { customers } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-white">Customer Database</h3>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400 whitespace-nowrap">
            <thead className="text-xs uppercase bg-black/50 text-gray-500 border-b border-white/5">
              <tr>
                <th className="px-4 py-4 font-medium">Customer Info</th>
                <th className="px-4 py-4 font-medium">Contact</th>
                <th className="px-4 py-4 font-medium">Orders</th>
                <th className="px-4 py-4 font-medium">Total Spent</th>
                <th className="px-4 py-4 font-medium">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.map(customer => (
                <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-medium text-white">{customer.name}</div>
                    <div className="text-xs font-mono mt-1 opacity-50">{customer.id}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail size={12} /> {customer.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={12} /> {customer.phone}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-white/5 rounded text-white font-mono">{customer.ordersCount}</span>
                  </td>
                  <td className="px-4 py-4 text-white font-medium">₦{customer.totalSpent.toLocaleString()}</td>
                  <td className="px-4 py-4">{customer.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
