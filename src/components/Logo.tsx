import { useStore } from '../store/useStore';
import logoImg from '../assets/images/matic_fueltec_logo_1782248179542.jpg';

export default function Logo({ className = "h-10" }: { className?: string }) {
  const settings = useStore(state => state.settings);
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img loading="lazy" decoding="async" src={logoImg} alt={settings.siteName} className="h-full w-auto object-contain rounded" onError={(e) => {
        // Fallback to text if image not found
        (e.target as HTMLImageElement).style.display = 'none';
      }} />
      <span className="font-serif font-bold tracking-tight text-white flex flex-col justify-center leading-[1.1]">
        <span className="text-xl md:text-2xl uppercase">{settings.siteName.split(' ')[0] || 'MATIC'}</span>
        <span className="text-[10px] md:text-[11px] tracking-[0.25em] text-luxury-gold uppercase">{settings.siteName.split(' ').slice(1).join(' ') || 'FUELTEC'}</span>
      </span>
    </div>
  );
}
