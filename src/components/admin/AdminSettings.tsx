import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const { settings, updateSettings } = useStore();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-white">Platform Settings</h3>
      </div>

      <form onSubmit={handleSave} className="glass-card p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Site Name</label>
            <input 
              type="text" 
              value={formData.siteName} 
              onChange={e => setFormData({...formData, siteName: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-luxury-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Contact Phone</label>
            <input 
              type="text" 
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-luxury-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">WhatsApp Number</label>
            <input 
              type="text" 
              value={formData.whatsapp} 
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-luxury-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Support Email</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-luxury-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Office Address</label>
            <textarea 
              value={formData.address} 
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-luxury-gold/50 h-24"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-white/5 pt-6">
          <button 
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-luxury-gold hover:bg-luxury-gold-light text-black font-semibold rounded-lg transition-colors"
          >
            <Save size={18} /> Save Changes
          </button>
          {saved && <span className="text-green-400 text-sm">Settings saved successfully!</span>}
        </div>
      </form>
    </div>
  );
}
