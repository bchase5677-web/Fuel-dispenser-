import { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import Layout from '../components/Layout';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, settings, addOrder, addCustomer, clearCart } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (!isCheckingOut) {
      setIsCheckingOut(true);
      return;
    }

    if (!customerName.trim()) {
      alert("Please enter your name for the order.");
      return;
    }

    // Save Customer
    addCustomer({
      name: customerName,
      email: 'No Email',
      phone: 'No Phone',
      ordersCount: 1,
      totalSpent: total,
      joinDate: new Date().toISOString().split('T')[0]
    });

    // Save Order
    addOrder({
      customerName,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      total,
      items: cart
    });

    let message = `Hello ${settings.siteName},%0A%0ANew Order from: *${customerName}*%0A%0AItems:%0A`;
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${formatPrice(item.price)})%0A`;
    });
    message += `%0ATotal: *${formatPrice(total)}*%0A%0APlease process my order.`;

    window.open(`https://wa.me/${settings.whatsapp.replace(/\+/g, '')}?text=${message}`, '_blank');
    clearCart();
    setIsCheckingOut(false);
  };

  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[80vh]">
        <h1 className="font-serif text-4xl md:text-5xl text-luxury-white mb-12">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
            <h2 className="text-2xl text-gray-400 mb-6">Your cart is empty</h2>
            <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-luxury-gold text-black font-semibold rounded-full hover:bg-luxury-gold-light transition-colors">
              Continue Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row items-center gap-6 p-4 glass-card"
                >
                  <img loading="lazy" decoding="async" src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-medium text-white mb-1">{item.name}</h3>
                    <p className="text-luxury-gold text-sm uppercase tracking-widest">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-black/50 rounded-full border border-white/10 p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-white text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="glass-card p-8 h-fit">
              <h3 className="text-xl font-medium text-white mb-6">Order Summary</h3>
              <div className="space-y-4 text-sm text-gray-400 mb-6 pb-6 border-b border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-white">Calculated at checkout</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-medium text-white mb-8">
                <span>Total</span>
                <span className="text-luxury-gold">{formatPrice(total)}</span>
              </div>
              
              {isCheckingOut && (
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  />
                </div>
              )}

              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-luxury-gold hover:bg-luxury-gold-light text-black font-semibold rounded-full transition-all mb-4 flex items-center justify-center gap-2"
              >
                {isCheckingOut ? 'Confirm Order via WhatsApp' : 'Proceed to Checkout'}
              </button>
              <p className="text-center text-xs text-gray-500">Secure payment on delivery available.</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
