import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, ShieldCheck, Zap, Server, ChevronDown, 
  ArrowRight, CheckCircle2, Calculator 
} from 'lucide-react';

// ==========================================
// ЛОКАЛЬНЫЕ ДАННЫЕ
// ==========================================
const STEPS = [
  {
    id: '01',
    title: 'Инициализация профиля',
    desc: 'Создайте личный кабинет на нашем портале. Заполните базовую анкету и выберите до 3-х образовательных треков.',
    icon: <Server className="w-6 h-6 text-indigo-400" />
  },
  {
    id: '02',
    title: 'Синхронизация данных',
    desc: 'Загрузите сканы паспорта, СНИЛС и документа об образовании. Система автоматически верифицирует их через Госуслуги за 2 минуты.',
    icon: <FileText className="w-6 h-6 text-purple-400" />
  },
  {
    id: '03',
    title: 'Верификация баллов',
    desc: 'Результаты ЕГЭ подтянутся автоматически из федеральной базы. Добавьте сертификаты олимпиад для получения гранта (до 100%).',
    icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />
  },
  {
    id: '04',
    title: 'Оригинал и Приказ',
    desc: 'Подтвердите согласие на зачисление цифровой подписью. Найдите свой ID в смарт-контракте приказа о зачислении.',
    icon: <Zap className="w-6 h-6 text-pink-400" />
  }
];

const DOCUMENTS = [
  'Паспорт гражданина (разворот с фото и прописка)',
  'Документ об образовании (Аттестат или Диплом)',
  'СНИЛС (обязательно для граждан РФ)',
  'Медицинская справка 086/у (только для CyberSec)',
  'Портфолио на GitHub/Behance (опционально для +10 баллов)'
];

// ==========================================
// ГЛАВНЫЙ КОМПОНЕНТ
// ==========================================
export default function Rules() {
  const [activeTab, setActiveTab] = useState<'budget' | 'contract'>('budget');
  
  // Калькулятор (простая симуляция для визуала)
  const [scores, setScores] = useState({ math: 85, info: 90, rus: 80 });
  const totalScore = scores.math + scores.info + scores.rus;
  const chance = totalScore >= 270 ? 'Высокий (Грант 100%)' : totalScore >= 250 ? 'Средний (Бюджет)' : 'Контракт (Скидка 20%)';

  return (
    <div className="min-h-screen pt-40 pb-32 relative z-10">
      
      {/* ФОНОВЫЕ ЭФФЕКТЫ */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] pointer-events-none rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-32">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-8 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Протокол 2024 утвержден</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6">Алгоритм <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Поступления.</span></h1>
          <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed">
            Мы оцифровали весь процесс. Никаких очередей, бумажной волокиты и поездок в приемную комиссию. 10 минут вашего времени — и вы в системе.
          </p>
        </motion.div>

        {/* ШАГИ (GRID BENTO STYLE) */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
            <span className="w-12 h-1 bg-indigo-500 rounded-full"></span> 4 Шага к зачислению
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-[2rem] border-t border-t-white/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] group-hover:bg-indigo-500/20 transition-colors"></div>
                <div className="text-6xl font-black text-white/5 mb-6 absolute top-4 right-6 group-hover:scale-110 transition-transform">{step.id}</div>
                
                <div className="w-14 h-14 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-8 relative z-10 shadow-[0_0_20px_rgba(79,70,229,0.15)]">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed relative z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ДВЕ КОЛОНКИ: КАЛЬКУЛЯТОР И ДОКУМЕНТЫ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          
          {/* КАЛЬКУЛЯТОР (ИНТЕРАКТИВ) */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-panel rounded-[3rem] p-10 md:p-14 border border-indigo-500/20 bg-gradient-to-br from-[#0a0a0a] to-indigo-900/10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center"><Calculator className="w-6 h-6 text-indigo-400" /></div>
              <h3 className="text-3xl font-black text-white">Калькулятор шансов</h3>
            </div>

            <div className="space-y-6 mb-12">
              {[
                { label: 'Математика (Профиль)', key: 'math', val: scores.math, color: 'bg-indigo-500' },
                { label: 'Информатика / Физика', key: 'info', val: scores.info, color: 'bg-purple-500' },
                { label: 'Русский язык', key: 'rus', val: scores.rus, color: 'bg-cyan-500' }
              ].map((subj) => (
                <div key={subj.key}>
                  <div className="flex justify-between text-sm font-bold text-white/70 mb-3 uppercase tracking-wider">
                    <span>{subj.label}</span>
                    <span className="text-white">{subj.val}</span>
                  </div>
                  <input 
                    type="range" min="40" max="100" value={subj.val} 
                    onChange={(e) => setScores({...scores, [subj.key]: parseInt(e.target.value)})}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-black/50 border border-white/5">
              <div className="flex justify-between items-end mb-2">
                <span className="text-white/40 font-medium">Сумма баллов:</span>
                <span className="text-5xl font-black text-white">{totalScore}</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${(totalScore/300)*100}%` }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 font-medium">Прогноз зачисления:</span>
                <span className={`font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider border ${totalScore >= 270 ? 'bg-green-500/10 text-green-400 border-green-500/20' : totalScore >= 250 ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                  {chance}
                </span>
              </div>
            </div>
          </motion.div>

          {/* СПИСОК ДОКУМЕНТОВ */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-center">
            <h3 className="text-4xl font-black text-white mb-8">Пакет Данных</h3>
            <p className="text-xl text-white/40 mb-10 leading-relaxed">Загрузите качественные цветные сканы или фотографии. Наша система OCR распознает данные автоматически.</p>
            
            <ul className="space-y-4 mb-12">
              {DOCUMENTS.map((doc, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-white/80 font-medium">{doc}</span>
                </motion.li>
              ))}
            </ul>

            <Link to="/apply" className="inline-flex items-center gap-4 px-8 py-5 bg-white text-black font-black text-lg rounded-full hover:bg-indigo-500 hover:text-white transition-all w-max shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              Перейти к загрузке <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

        </div>

        {/* СРОКИ (ТАБЫ) */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel rounded-[3rem] p-10 md:p-16 border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <h3 className="text-4xl font-black text-white">Таймлайн приема</h3>
            <div className="flex bg-[#0a0a0a] p-1.5 rounded-full border border-white/10">
              <button onClick={() => setActiveTab('budget')} className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${activeTab === 'budget' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}>Бюджет / Грант</button>
              <button onClick={() => setActiveTab('contract')} className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${activeTab === 'contract' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}>Контракт</button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { date: '20 Июня', title: 'Открытие серверов', desc: 'Начало приема документов и формирование первых списков.' },
                { date: activeTab === 'budget' ? '25 Июля' : '20 Августа', title: 'Дедлайн загрузки', desc: 'Окончание приема документов и результатов ЕГЭ.' },
                { date: activeTab === 'budget' ? '09 Августа' : '31 Августа', title: 'Генерация Приказов', desc: 'Публикация финальных списков зачисленных в смарт-контракте.' }
              ].map((phase, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="text-3xl font-black text-indigo-400 mb-2">{phase.date}</div>
                  <div className="text-xl font-bold text-white mb-4">{phase.title}</div>
                  <p className="text-white/40 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
