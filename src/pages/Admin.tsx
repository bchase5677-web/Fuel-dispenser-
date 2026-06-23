import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useStore } from '../store/useStore';
import { 
  LayoutDashboard, Package, ShoppingBag, Users, Settings, 
  BarChart, LogOut, Bell, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AdminProducts from '../components/admin/AdminProducts';
import AdminOrders from '../components/admin/AdminOrders';
import AdminCustomers from '../components/admin/AdminCustomers';
import AdminAnalytics from '../components/admin/AdminAnalytics';
import AdminSettings from '../components/admin/AdminSettings';
import Logo from '../components/Logo';

export default function Admin() {
  const { isAdmin, setAdmin } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const tabs = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { icon: <Package size={20} />, label: 'Products' },
    { icon: <ShoppingBag size={20} />, label: 'Orders' },
    { icon: <Users size={20} />, label: 'Customers' },
    { icon: <BarChart size={20} />, label: 'Analytics' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="h-screen w-full bg-luxury-black flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-luxury-charcoal border-r border-white/5 flex flex-col z-50 transition-transform duration-300
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <Logo className="h-6" />
            <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Admin Dashboard</p>
          </div>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map((item, i) => (
            <button 
              key={i} 
              onClick={() => {
                setActiveTab(item.label);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                activeTab === item.label 
                  ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => { setAdmin(false); navigate('/'); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#0a0a0a]">
        <header className="sticky top-0 z-10 bg-luxury-charcoal/80 backdrop-blur-xl px-4 md:px-8 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-medium text-white">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-luxury-gold rounded-full"></span>
            </button>
            <Link to="/" className="hidden md:block text-sm text-luxury-gold hover:underline">View Site</Link>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {activeTab === 'Dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {[
                  { label: 'Total Revenue', value: '₦45,200,000', trend: '+12.5%' },
                  { label: 'Active Orders', value: '24', trend: '+5.2%' },
                  { label: 'Total Products', value: '156', trend: '0%' },
                  { label: 'Live Visitors', value: '18', trend: '+2.1%' }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-sm text-gray-400 mb-2">{stat.label}</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-xl md:text-2xl font-serif text-white">{stat.value}</span>
                      <span className="text-sm text-green-400">{stat.trend}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="glass-card p-4 md:p-6">
                <h3 className="text-lg font-medium text-white mb-6">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-400 whitespace-nowrap">
                    <thead className="text-xs uppercase bg-black/50 text-gray-500 border-b border-white/5">
                      <tr>
                        <th className="px-4 py-4 font-medium">Order ID</th>
                        <th className="px-4 py-4 font-medium">Customer</th>
                        <th className="px-4 py-4 font-medium">Status</th>
                        <th className="px-4 py-4 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { id: '#ORD-001', name: 'Aliko Dangote', status: 'Completed', total: '₦4,500,000' },
                        { id: '#ORD-002', name: 'Femi Otedola', status: 'Pending', total: '₦2,800,000' },
                        { id: '#ORD-003', name: 'Mike Adenuga', status: 'Processing', total: '₦8,500,000' },
                      ].map((order, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-4 text-white font-mono">{order.id}</td>
                          <td className="px-4 py-4">{order.name}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs border ${
                              order.status === 'Completed' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                              order.status === 'Pending' ? 'border-luxury-gold/30 text-luxury-gold bg-luxury-gold/10' :
                              'border-blue-500/30 text-blue-400 bg-blue-500/10'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-white">{order.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'Products' && <AdminProducts />}
          {activeTab === 'Orders' && <AdminOrders />}
          {activeTab === 'Customers' && <AdminCustomers />}
          {activeTab === 'Analytics' && <AdminAnalytics />}
          {activeTab === 'Settings' && <AdminSettings />}
        </div>
      </main>
    </div>
  );
}
