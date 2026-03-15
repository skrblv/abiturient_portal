import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Apply() {
  const [specs, setSpecs] = useState<{name: string}[]>([]);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', phone: '', specialty: '', comment: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => { api.get('/specialties').then(res => setSpecs(res.data)); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/applications', formData);
      setTimeout(() => {
        setStatus('success');
        setFormData({ first_name: '', last_name: '', email: '', phone: '', specialty: '', comment: '' });
      }, 1500);
    } catch (error) { setStatus('error'); }
  };

  return (
    <div className="min-h-screen pt-40 pb-32 px-4 flex justify-center items-center relative overflow-hidden">
      {/* Фоны */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 blur-[200px] rounded-full mix-blend-screen pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl glass-panel rounded-[3rem] p-1 md:p-2 relative z-10 overflow-hidden"
      >
        <div className="bg-[#050505] rounded-[2.8rem] p-10 md:p-16 w-full h-full relative border border-white/5">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-center py-20">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="w-40 h-40 bg-indigo-500/10 rounded-full flex items-center justify-center mb-10 border border-indigo-500/30">
                  <CheckCircle2 className="w-20 h-20 text-indigo-400" />
                </motion.div>
                <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Заявка в системе</h2>
                <p className="text-xl text-white/40 max-w-lg mx-auto leading-relaxed">Мы получили ваши данные. Куратор приемной комиссии свяжется с вами в течение 24 часов.</p>
                <button onClick={() => setStatus('idle')} className="mt-12 px-10 py-5 bg-white/10 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300">
                  Вернуться
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
                <div className="mb-16">
                  <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-white">Инициализация <span className="text-indigo-500">профиля.</span></h1>
                  <p className="text-white/40 text-xl">Заполните протокол поступления. Это первый шаг к технологической элите.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Имя" value={formData.first_name} onChange={(v) => setFormData({...formData, first_name: v})} />
                    <InputField label="Фамилия" value={formData.last_name} onChange={(v) => setFormData({...formData, last_name: v})} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField type="email" label="Email" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} />
                    <InputField type="tel" label="Телефон" value={formData.phone} onChange={(v) => setFormData({...formData, phone: v})} />
                  </div>

                  <div className="relative group">
                    <select required className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-8 py-6 text-white text-lg outline-none appearance-none focus:border-indigo-500 focus:shadow-[0_0_30px_rgba(79,70,229,0.2)] transition-all peer" value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})}>
                      <option value="" disabled>Выберите архитектуру программы...</option>
                      {specs.map((s, i) => <option key={i} value={s.name} className="bg-[#0a0a0a]">{s.name}</option>)}
                    </select>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 peer-focus:text-indigo-500 transition-colors">▼</div>
                  </div>

                  <div className="relative">
                    <textarea required rows={4} className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-8 py-6 text-white text-lg outline-none focus:border-indigo-500 focus:shadow-[0_0_30px_rgba(79,70,229,0.2)] transition-all peer resize-none" value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} />
                    <label className={`absolute left-8 pointer-events-none transition-all duration-300 font-medium ${formData.comment ? 'top-2 text-xs text-indigo-500' : 'top-6 text-white/30 text-lg'}`}>Расскажите о себе (код, проекты, мотивация)...</label>
                  </div>

                  <button disabled={status === 'loading'} type="submit" className="w-full py-6 bg-white text-black font-black text-xl rounded-2xl hover:bg-indigo-600 hover:text-white transition-all duration-500 flex justify-center items-center gap-4 disabled:opacity-50 group mt-4">
                    {status === 'loading' ? <span className="animate-pulse">Обработка...</span> : <>Запустить протокол <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></>}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// Кастомный инпут
const InputField = ({ label, type = 'text', value, onChange }: { label: string, type?: string, value: string, onChange: (v: string) => void }) => {
  const [isFocused, setIsFocused] = useState(false);
  const active = isFocused || value.length > 0;

  return (
    <div className="relative">
      <input 
        required type={type} 
        className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-8 pt-9 pb-3 text-white text-lg outline-none focus:border-indigo-500 focus:shadow-[0_0_30px_rgba(79,70,229,0.2)] transition-all"
        value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
      />
      <label className={`absolute left-8 pointer-events-none transition-all duration-300 font-medium ${active ? 'top-3 text-xs text-indigo-500' : 'top-6 text-white/30 text-lg'}`}>{label}</label>
    </div>
  );
}
