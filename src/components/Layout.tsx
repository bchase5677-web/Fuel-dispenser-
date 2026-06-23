import { ReactNode } from 'react';
import Navbar from './Navbar';
import AIAssistant from './AIAssistant';
import { useStore } from '../store/useStore';
import Logo from './Logo';

export default function Layout({ children }: { children: ReactNode }) {
  const settings = useStore(state => state.settings);
  
  return (
    <div className="min-h-screen bg-luxury-black flex flex-col relative">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <AIAssistant />
      <footer className="bg-[#0a0a0a] py-16 border-t border-white/5 pb-24 md:pb-16 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-2xl text-gradient-gold mb-4 flex justify-center md:justify-start items-center gap-2">
              <Logo className="h-10" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Premium fuel dispensers designed for performance, reliability and luxury.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-luxury-white font-medium mb-4 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/shop" className="hover:text-luxury-gold transition-colors">Products</a></li>
              <li><a href="/about" className="hover:text-luxury-gold transition-colors">About Us</a></li>
              <li><a href="/services" className="hover:text-luxury-gold transition-colors">Services</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-luxury-white font-medium mb-4 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/contact" className="hover:text-luxury-gold transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Returns</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-luxury-white font-medium mb-4 uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>{settings.address}</li>
              <li>{settings.phone}</li>
              <li>{settings.email}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {settings.siteName.toUpperCase()} LTD. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
