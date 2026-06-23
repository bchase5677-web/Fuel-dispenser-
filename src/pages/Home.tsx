import { motion } from 'motion/react';
import { ArrowRight, Gem, Cpu, ShieldCheck, Check, Phone, MessageCircle, FileText, Monitor, Target, Shield, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import Layout from '../components/Layout';
import { useStore } from '../store/useStore';
import heroImg from '../assets/images/luxury_fuel_dispenser_golden_1782246075510.jpg';

export default function Home() {
  const settings = useStore(state => state.settings);
  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async"
            src={heroImg} 
            alt="Luxury Fuel Dispenser" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/80 via-luxury-black/60 to-luxury-black z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center mt-12 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-normal leading-tight mb-6">
              <span className="text-white">Luxury Fuel</span><br />
              <span className="text-luxury-gold">Dispensers</span>
            </h1>
            <p className="text-xl text-white font-medium mb-4">
              Engineered for Performance.<br/>Designed for Prestige.
            </p>
            <p className="text-gray-400 mb-8 max-w-md font-light leading-relaxed">
              Premium fuel dispensing solutions for a superior experience.
            </p>
            <Link to="/shop" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-luxury-gold hover:bg-luxury-gold-light text-black font-semibold rounded-none uppercase tracking-widest text-sm transition-all group mb-4">
              Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <br />
            <Link to="/account" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-luxury-gold text-white hover:text-luxury-gold font-semibold rounded-none uppercase tracking-widest text-sm transition-all">
              Sign Up or Login
            </Link>
          </motion.div>
        </div>

        {/* Hero Bottom Features */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-12 mt-12">
          <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-white/10 pt-8">
            <div className="flex flex-col items-center text-center">
              <Gem className="w-8 h-8 text-luxury-gold mb-3" />
              <span className="text-white text-xs md:text-sm font-medium">Premium<br/>Quality</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="w-8 h-8 text-luxury-gold mb-3" />
              <span className="text-white text-xs md:text-sm font-medium">Advanced<br/>Technology</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Cpu className="w-8 h-8 text-luxury-gold mb-3" />
              <span className="text-white text-xs md:text-sm font-medium">Reliable<br/>Performance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (Light) */}
      <section className="bg-[#F8F8F5] text-luxury-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-luxury-gold-dark text-xs uppercase tracking-widest font-semibold mb-4 block">About Matic</span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal mb-8 leading-tight">
              Where Luxury<br/>Meets Innovation
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl">
              Matic fuel dispensers are crafted with precision, built with advanced technology, and designed to elevate your fueling experience.
            </p>
            <a href="#dispensers" className="inline-flex items-center gap-3 px-8 py-4 border border-luxury-gold-dark text-luxury-gold-dark hover:bg-luxury-gold-dark hover:text-white font-semibold rounded-none uppercase tracking-widest text-sm transition-all group">
              Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* DISPENSERS SECTION */}
      <section id="dispensers" className="bg-luxury-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-luxury-gold text-xs uppercase tracking-widest font-semibold mb-4 block">Our Dispensers</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-normal mb-16 leading-tight">
            Designed to Stand Out.<br/>Built to Perform.
          </h2>

          <div className="glass-card bg-[#151515] p-6 md:p-12 border border-white/5 rounded-3xl flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden bg-gradient-to-b from-white/5 to-transparent p-8 flex justify-center items-center">
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1626015509743-34e8d35688a2?auto=format&fit=crop&q=80&w=800" alt="Matic Prime" className="w-[80%] object-contain drop-shadow-2xl" />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="font-serif text-3xl text-white mb-4">LFX Series</h3>
              <p className="text-gray-400 font-light mb-8">The perfect blend of elegance and efficiency.</p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-luxury-gold" /> Sleek & Modern Design
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-luxury-gold" /> High Accuracy
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-luxury-gold" /> User Friendly Interface
                </li>
              </ul>

              <Link to="/shop" className="text-luxury-gold uppercase tracking-widest text-sm font-semibold flex items-center gap-2 group hover:text-luxury-gold-light">
                View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER SECTION */}
      <section className="bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-black py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Need Help?</h4>
              <p className="text-sm opacity-80">Talk to our expert</p>
            </div>
          </div>
          <Link to="/contact" className="px-8 py-3 bg-luxury-black text-white rounded-none uppercase tracking-widest text-sm font-bold hover:bg-[#1a1a1a] transition-colors shadow-lg">
            Contact Us
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-luxury-black py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <span className="text-luxury-gold text-xs uppercase tracking-widest font-semibold mb-4 block">Premium Features</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-normal mb-8 leading-tight">
              Luxury in Every Detail
            </h2>
            <Link to="/shop" className="hidden md:inline-flex items-center gap-3 px-8 py-4 bg-luxury-gold hover:bg-luxury-gold-light text-black font-semibold rounded-none uppercase tracking-widest text-sm transition-all group mt-8">
              View All Features <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-10">
            {[
              { icon: <Monitor className="w-6 h-6 text-luxury-gold" />, title: "Advanced Display", desc: "High visibility display for seamless operation." },
              { icon: <Target className="w-6 h-6 text-luxury-gold" />, title: "High Accuracy", desc: "Precision measurement for every drop." },
              { icon: <Shield className="w-6 h-6 text-luxury-gold" />, title: "Durable & Reliable", desc: "Built with premium materials for long lasting performance." },
              { icon: <Leaf className="w-6 h-6 text-luxury-gold" />, title: "Eco Friendly", desc: "Designed to reduce emissions and protect the environment." }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full border border-luxury-gold/30 flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-white text-xl font-medium mb-2">{feature.title}</h4>
                  <p className="text-gray-400 font-light">{feature.desc}</p>
                </div>
              </div>
            ))}
            
            <Link to="/shop" className="md:hidden inline-flex items-center gap-3 px-8 py-4 bg-luxury-gold hover:bg-luxury-gold-light text-black font-semibold rounded-none uppercase tracking-widest text-sm transition-all group w-full justify-center mt-6">
              View All Features <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="bg-luxury-black pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-luxury-gold text-xs uppercase tracking-widest font-semibold mb-4 block">Our Projects</span>
          <h2 className="font-serif text-4xl text-white font-normal mb-12">Trusted by Leaders<br/>Worldwide</h2>
          
          <div className="relative rounded-3xl overflow-hidden group border border-white/5">
            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1545620958-3cc08182746b?auto=format&fit=crop&q=80&w=1200" alt="Project" className="w-full h-[400px] md:h-[600px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-luxury-gold hover:text-black transition-colors opacity-0 group-hover:opacity-100">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-luxury-gold hover:text-black transition-colors opacity-0 group-hover:opacity-100">
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-luxury-gold" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <div className="w-2 h-2 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA & STATS */}
      <section className="bg-luxury-black py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-luxury-gold text-xs uppercase tracking-widest font-semibold mb-4 block">Ready to elevate your station?</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-normal mb-6">Let's Build the Future<br/>of Fueling Together</h2>
          <p className="text-gray-400 font-light mb-10">Get a customized solution that matches your vision.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to="/shop" className="inline-flex items-center gap-3 px-8 py-4 bg-luxury-gold hover:bg-luxury-gold-light text-black font-semibold rounded-none uppercase tracking-widest text-sm transition-all group shadow-lg shadow-luxury-gold/20">
              Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/account" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-luxury-gold text-white hover:text-luxury-gold font-semibold rounded-none uppercase tracking-widest text-sm transition-all">
              Sign Up or Login
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
            <div>
              <div className="text-4xl font-serif text-luxury-gold mb-2">10+</div>
              <div className="text-white text-sm font-medium">Years of<br/>Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-luxury-gold mb-2">500+</div>
              <div className="text-white text-sm font-medium">Installations<br/>Worldwide</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-luxury-gold mb-2">30+</div>
              <div className="text-white text-sm font-medium">Countries<br/>Served</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-luxury-gold mb-2">100%</div>
              <div className="text-white text-sm font-medium">Customer<br/>Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
