import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router';
import aiRobotIcon from '../assets/images/ai_robot_icon_1782246254026.jpg';

interface Message {
  role: 'user' | 'model';
  text: string;
  action?: string;
}

export default function AIAssistant() {
  const { isAIOpen, setAIOpen } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to Matic FUELTEC Ltd. I am your AI Customer Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    
    // Quick admin bypass for demo purposes, actual logic handled by server instructing format
    if (userMessage.toLowerCase().trim() === 'admin') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: 'Admin portal access requested. Please click the button below to proceed to the secure login page.',
          action: 'ADMIN_LOGIN'
        }]);
      }, 600);
      return;
    }

    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'I encountered an error connecting to my servers. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isAIOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setAIOpen(true)}
            className="fixed bottom-20 md:bottom-6 right-6 flex flex-col items-center gap-2 z-50 group"
          >
            <div className="w-14 h-14 bg-luxury-black rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-luxury-gold flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
              <img loading="lazy" decoding="async" src={aiRobotIcon} alt="Ask Agent" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold bg-luxury-black/90 px-2.5 py-1 rounded-sm backdrop-blur border border-luxury-gold/30">Ask Agent</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isAIOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 md:bottom-6 right-6 w-[calc(100vw-48px)] md:w-[380px] h-[500px] md:h-[600px] max-h-[80vh] glass-card flex flex-col overflow-hidden z-50 border border-luxury-gold/20 shadow-2xl"
          >
            {/* Header */}
            <div className="bg-luxury-black/90 p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-luxury-white">Matic AI Assistant</h3>
                  <p className="text-xs text-luxury-gold">Online</p>
                </div>
              </div>
              <button onClick={() => setAIOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-luxury-charcoal/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-luxury-gold text-black rounded-br-sm'
                        : 'bg-luxury-black border border-white/5 text-gray-300 rounded-bl-sm prose prose-invert prose-sm'
                    }`}
                  >
                    {msg.role === 'model' ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                    {msg.action === 'ADMIN_LOGIN' && (
                      <button 
                        onClick={() => { setAIOpen(false); navigate('/admin/login'); }}
                        className="mt-3 px-4 py-2 bg-luxury-gold text-black rounded-lg text-xs font-bold uppercase tracking-wider w-full text-center hover:bg-luxury-gold-light transition-colors"
                      >
                        Open Admin Login
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-luxury-black border border-white/5 p-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-luxury-gold" />
                    <span className="text-xs text-gray-400">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-luxury-black/90 border-t border-white/5">
              <div className="relative flex items-center">
                <button className="absolute left-3 text-gray-400 hover:text-luxury-gold transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about our dispensers..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-11 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 rounded-full bg-luxury-gold text-black flex items-center justify-center disabled:opacity-50 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
