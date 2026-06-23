import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useStore } from '../store/useStore';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from '../components/Logo';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAdmin } = useStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'chasedev') {
      setAdmin(true);
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8 relative z-10">
          <Link to="/" className="inline-block mb-6">
            <Logo className="h-10 justify-center" />
          </Link>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-luxury-charcoal border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <ShieldCheck className="w-8 h-8 text-luxury-gold" />
            </div>
          </div>
          <h1 className="text-2xl font-serif text-white mb-2">Secure Admin Access</h1>
          <p className="text-gray-400 text-sm">Please authenticate to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 space-y-6 relative z-10">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-widest">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-luxury-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-luxury-gold/50 transition-colors"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-luxury-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-luxury-gold/50 transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-luxury-gold hover:bg-luxury-gold-light text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            <Lock className="w-4 h-4" />
            Authenticate
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
