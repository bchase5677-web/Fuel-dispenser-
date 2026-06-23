import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Heart, Search, Filter, X, ChevronRight } from 'lucide-react';
import { useStore, Product } from '../store/useStore';
import Layout from '../components/Layout';

export default function Shop() {
  const { addToCart, products } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(p => cats.add(p.category));
    return Array.from(cats);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[80vh]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
            <div className="glass-card p-5">
              <h3 className="font-serif text-lg text-white mb-4 uppercase tracking-widest text-sm border-b border-white/10 pb-3">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full flex items-center justify-between text-left px-3 py-2 rounded text-sm transition-colors ${selectedCategory === null ? 'bg-luxury-gold/20 text-luxury-gold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    All Products
                    <ChevronRight size={14} />
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between text-left px-3 py-2 rounded text-sm transition-colors ${selectedCategory === cat ? 'bg-luxury-gold/20 text-luxury-gold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      {cat}
                      <ChevronRight size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-6 gap-6">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-luxury-white mb-2">{selectedCategory || 'Premium Shop'}</h1>
                <p className="text-gray-400 font-light text-sm">Showing {filteredProducts.length} results</p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search products, parts..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group cursor-pointer glass-card bg-luxury-black/40 hover:bg-luxury-charcoal flex flex-col h-full overflow-hidden border-white/5 hover:border-luxury-gold/30 transition-all shadow-md hover:shadow-xl hover:shadow-luxury-gold/5 rounded-2xl"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/50 m-2 rounded-xl">
                      <img loading="lazy" decoding="async" 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <button 
                        onClick={(e) => { e.stopPropagation(); }}
                        className="absolute top-2 right-2 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-luxury-gold transition-colors z-10"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      {!product.stock && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-red-500/80 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider z-10">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <div className="text-xs text-luxury-gold uppercase tracking-widest mb-2">{product.category}</div>
                      <h3 className="font-serif text-lg text-white mb-2 line-clamp-2 leading-tight flex-1">{product.name}</h3>
                      <div className="font-light text-xl text-gray-300 mb-4">
                        {formatPrice(product.price)}
                      </div>
                      
                      <div className="flex gap-2 mt-auto">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          disabled={!product.stock}
                          className="flex-1 py-3 bg-luxury-gold hover:bg-luxury-gold-light text-black font-semibold rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </button>
                        <a 
                          href={`https://wa.me/${useStore.getState().settings.whatsapp.replace('+', '')}?text=Hello ${useStore.getState().settings.siteName},%0A%0AI would like to order:%0AProduct: ${product.name}%0APrice: ${formatPrice(product.price)}%0A%0APlease let me know the next steps.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-medium rounded-full border border-[#25D366]/20 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          Order on WA
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-500 mb-4 text-6xl">🔍</div>
                <h3 className="text-xl text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your search or category filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-luxury-black/90 backdrop-blur-xl"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-luxury-charcoal border border-white/10 w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row relative shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              >
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:text-luxury-gold z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                  <img loading="lazy" decoding="async" src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover min-h-[300px]" />
                </div>
                
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center max-h-[80vh] overflow-y-auto">
                  <span className="text-luxury-gold text-sm uppercase tracking-widest mb-4 inline-block">{selectedProduct.category}</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">{selectedProduct.name}</h2>
                  <p className="text-3xl font-light text-gray-300 mb-8 border-b border-white/5 pb-8">{formatPrice(selectedProduct.price)}</p>
                  
                  <p className="text-gray-400 font-light leading-relaxed mb-6">{selectedProduct.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-2 gap-1">
                      <span className="text-gray-500 shrink-0">Availability</span>
                      <span className={`sm:text-right ${selectedProduct.stock ? "text-green-400" : "text-red-400"}`}>{selectedProduct.stock ? "In Stock" : "Out of Stock"}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-2 gap-1">
                      <span className="text-gray-500 shrink-0">Warranty</span>
                      <span className="text-gray-300 sm:text-right">2 Years Manufacturer Warranty</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-2 gap-1">
                      <span className="text-gray-500 shrink-0">Installation</span>
                      <span className="text-gray-300 sm:text-right">Professional Installation Included</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-auto">
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      disabled={!selectedProduct.stock}
                      className="w-full py-4 bg-luxury-gold hover:bg-luxury-gold-light text-black font-semibold rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </button>
                    <a 
                      href={`https://wa.me/${useStore.getState().settings.whatsapp.replace('+', '')}?text=Hello ${useStore.getState().settings.siteName},%0A%0AI would like to order:%0AProduct: ${selectedProduct.name}%0APrice: ${formatPrice(selectedProduct.price)}%0A%0APlease let me know the next steps.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-medium rounded-full border border-[#25D366]/20 transition-all flex items-center justify-center gap-2"
                    >
                      Order via WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
