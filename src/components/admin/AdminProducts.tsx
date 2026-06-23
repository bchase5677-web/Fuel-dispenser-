import { useState, useRef } from 'react';
import { useStore, Product } from '../../store/useStore';
import { Plus, Edit2, Trash2, Check, X, Upload } from 'lucide-react';

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', price: 0, image: '', stock: true, category: 'Fuel Dispensers', description: ''
  });

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(product.id);
  };

  const handleSave = () => {
    if (isAdding) {
      addProduct({
        ...formData,
        id: `prod-${Date.now()}`
      } as Product);
      setIsAdding(false);
    } else if (isEditing) {
      updateProduct(isEditing, formData);
      setIsEditing(null);
    }
    setFormData({ name: '', price: 0, image: '', stock: true, category: 'Fuel Dispensers', description: '' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-white">Manage Products</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold-light text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {(isAdding || isEditing) && (
        <div className="glass-card p-6 mb-8 border border-luxury-gold/30">
          <h4 className="text-lg text-white mb-4">{isAdding ? 'Add New Product' : 'Edit Product'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Price (₦)</label>
              <input 
                type="number" 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Category</label>
              <input 
                type="text"
                list="categories-list"
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
                placeholder="Select or type new category"
              />
              <datalist id="categories-list">
                {Array.from(new Set(products.map(p => p.category))).map(cat => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.stock} 
                  onChange={e => setFormData({...formData, stock: e.target.checked})}
                  className="rounded border-white/10 bg-black/50 text-luxury-gold focus:ring-luxury-gold"
                />
                In Stock
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Description</label>
              <textarea 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white h-20"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Image</label>
              <div className="flex items-center gap-4">
                {formData.image && (
                  <img loading="lazy" decoding="async" src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded border border-white/10" />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-sm text-white transition-colors"
                >
                  <Upload size={16} /> Upload Image
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button 
              onClick={() => { setIsAdding(false); setIsEditing(null); }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded text-sm transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-luxury-gold hover:bg-luxury-gold-light text-black font-semibold rounded text-sm transition-colors"
            >
              Save Product
            </button>
          </div>
        </div>
      )}

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400 whitespace-nowrap">
            <thead className="text-xs uppercase bg-black/50 text-gray-500 border-b border-white/5">
              <tr>
                <th className="px-4 py-4 font-medium">Image</th>
                <th className="px-4 py-4 font-medium">Name</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 font-medium">Price</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4">
                    <img loading="lazy" decoding="async" src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded bg-white/5" />
                  </td>
                  <td className="px-4 py-4 text-white">{product.name}</td>
                  <td className="px-4 py-4">{product.category}</td>
                  <td className="px-4 py-4 text-white">₦{product.price.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs border ${product.stock ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'}`}>
                      {product.stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(product)} className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => deleteProduct(product.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded transition-colors">
                        <Trash2 size={16} />
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
