import { useState } from 'react';
import Layout from '../components/Layout';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { addCustomer, settings } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin && !formData.name) {
      setError('Please provide your name for registration.');
      return;
    }

    // Mock successful authentication
    if (!isLogin) {
      addCustomer({
        name: formData.name,
        email: formData.email,
        phone: 'Not provided',
        ordersCount: 0,
        totalSpent: 0,
        joinDate: new Date().toISOString().split('T')[0]
      });
    }

    // Store dummy auth token
    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user_name', isLogin ? formData.email.split('@')[0] : formData.name);

    navigate('/shop');
  };

  return (
    <Layout>
      <div className="pt-32 pb-24 px-6 max-w-md mx-auto min-h-[80vh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-10 border border-luxury-gold/30 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light" />
          
          <h2 className="text-3xl font-serif text-white mb-2 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 text-center text-sm mb-8">
            {isLogin ? 'Enter your details to access your account' : `Join ${settings.siteName} for a premium experience`}
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded px-11 py-3 text-white focus:outline-none focus:border-luxury-gold/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded px-11 py-3 text-white focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded px-11 py-3 text-white focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 mt-6 bg-luxury-gold hover:bg-luxury-gold-light text-black font-semibold rounded transition-all flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="ml-2 text-luxury-gold hover:text-luxury-gold-light transition-colors font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
