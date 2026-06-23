import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Menu, X, User, Phone, MessageCircle, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, settings } = useStore();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4',
          isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-300 hover:text-luxury-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative group">
              <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-luxury-gold transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-luxury-gold transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-luxury-black/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <Logo className="h-8" />
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-luxury-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex flex-col gap-6">
                <a href={`tel:${settings.phone}`} className="text-gray-400 flex items-center gap-4 text-lg hover:text-white transition-colors"><Phone size={24} className="text-luxury-gold"/> Call Us</a>
                <a href={`https://wa.me/${settings.whatsapp.replace('+', '')}`} className="text-[#25D366] flex items-center gap-4 text-lg hover:text-white transition-colors"><MessageCircle size={24}/> WhatsApp</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
