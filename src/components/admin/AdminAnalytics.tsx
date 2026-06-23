import { motion } from 'motion/react';
import { Users, Eye, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-white">Analytics Overview</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {[
          { label: 'Live Visitors', value: '24', trend: '+12%', icon: <Eye className="text-blue-400" /> },
          { label: 'Total Revenue', value: '₦45.2M', trend: '+12.5%', icon: <DollarSign className="text-green-400" /> },
          { label: 'Conversion Rate', value: '3.2%', trend: '+0.4%', icon: <TrendingUp className="text-luxury-gold" /> },
          { label: 'Active Sessions', value: '1,245', trend: '+5%', icon: <Users className="text-purple-400" /> }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border-t-2"
            style={{ borderTopColor: 'rgba(212, 175, 55, 0.3)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-400">{stat.label}</h3>
              {stat.icon}
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-serif text-white">{stat.value}</span>
              <span className="text-sm text-green-400">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 h-80 flex flex-col">
          <h4 className="text-white font-medium mb-4">Visitor Traffic (Last 7 Days)</h4>
          <div className="flex-1 flex items-end gap-2 text-xs text-gray-500 pb-6 relative">
            <div className="absolute left-0 top-0 bottom-6 w-px bg-white/10" />
            <div className="absolute left-0 bottom-6 right-0 h-px bg-white/10" />
            {[40, 60, 45, 80, 50, 90, 75].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 relative z-10 group">
                <div 
                  className="w-full bg-luxury-gold/50 rounded-t group-hover:bg-luxury-gold transition-colors"
                  style={{ height: `${height}%` }}
                />
                <span>Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 h-80 flex flex-col">
          <h4 className="text-white font-medium mb-4">Sales by Category</h4>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-8 border-luxury-gold flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border-8 border-white/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)' }} />
               <div className="text-center">
                 <div className="text-2xl font-serif text-white">75%</div>
                 <div className="text-xs text-gray-400">Dispensers</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
