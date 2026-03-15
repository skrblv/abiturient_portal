import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Code, Cpu, Shield, Zap, Terminal, 
  ChevronDown, Globe, Rocket, Fingerprint, Database, 
  Binary, Network, Lock, Braces 
} from 'lucide-react';

// --- ЛОКАЛЬНЫЕ ДАННЫЕ ДЛЯ МАСШТАБНОСТИ СТРАНИЦЫ ---

const MARQUEE_TEXTS = [
  'CyberSecurity', 'Artificial Intelligence', 'Web3 & Blockchain', 
  'Data Science', 'Quantum Computing', 'Machine Learning', 
  'Neural Networks', 'Cloud Architecture'
];

const TIMELINE_STEPS = [
  {
    year: '01',
    title: 'Инициализация & Фундамент',
    desc: 'Глубокое погружение в алгоритмы, структуры данных и низкоуровневое программирование (C/C++, Rust). Вы учитесь понимать, как работает машина на уровне процессора.',
    icon: <Binary className="w-6 h-6 text-indigo-400" />
  },
  {
    year: '02',
    title: 'Архитектура & Паттерны',
    desc: 'Проектирование высоконагруженных систем. Изучение микросервисной архитектуры, баз данных (PostgreSQL, Redis, ClickHouse) и DevOps практик.',
    icon: <Database className="w-6 h-6 text-purple-400" />
  },
  {
    year: '03',
    title: 'Специализация & R&D',
    desc: 'Выбор узкого профиля: AI, CyberSec или Web3. Работа в закрытых лабораториях университета над реальными задачами от BigTech компаний.',
    icon: <Network className="w-6 h-6 text-cyan-400" />
  },
  {
    year: '04',
    title: 'Сингулярность & Диплом',
    desc: 'Запуск собственного стартапа в инкубаторе университета или оплачиваемая стажировка (Middle level) в компаниях-партнерах. Защита проекта перед инвесторами.',
    icon: <Rocket className="w-6 h-6 text-pink-400" />
  }
];

const FAQS = [
  {
    question: "Требуется ли продвинутое знание математики для поступления?",
    answer: "Мы ценим логическое мышление выше заученных формул. Базовых знаний профильной математики достаточно для старта. Всю необходимую дискретную математику и линейную алгебру мы дадим на первом курсе с нуля, но в очень интенсивном темпе."
  },
  {
    question: "Какое железо (ноутбук) мне понадобится?",
    answer: "Любой современный ноутбук с 16GB RAM (Apple Silicon M1/M2 или аналоги на Windows/Linux). Однако, для тяжелых вычислений, обучения нейросетей и рендеринга мы предоставляем доступ к нашим облачным кластерам (NVIDIA A100) 24/7."
  },
  {
    question: "Можно ли совмещать учебу с работой?",
    answer: "Первые два курса — категорически нет. Нагрузка сопоставима с full-time работой (40-50 часов в неделю). С третьего курса мы сами интегрируем вас в рабочие процессы компаний-партнеров в рамках учебного плана."
  },
  {
    question: "Что если я пойму, что выбрал не то направление?",
    answer: "Первый год (Core Year) является общим для всех IT-специальностей. Вы сможете без потери времени сменить профиль в конце второго семестра, основываясь на реальном опыте написания кода."
  },
  {
    question: "Предоставляется ли отсрочка и общежитие?",
    answer: "Да. Университет имеет государственную аккредитацию (отсрочка предоставляется). Наш кампус находится в 5 минутах от учебных корпусов и представляет собой современные смарт-апартаменты с коворкингами на каждом этаже."
  }
];

const ALUMNI = [
  { name: 'Алексей Воронов', role: 'Senior AI Engineer @ OpenAI', year: 'Выпуск 2021' },
  { name: 'Елена Смирнова', role: 'Security Researcher @ Google', year: 'Выпуск 2020' },
  { name: 'Даниил Марков', role: 'Core Dev @ Ethereum Foundation', year: 'Выпуск 2022' },
  { name: 'Анна Ким', role: 'CTO @ FinTech Startup (Y Combinator)', year: 'Выпуск 2019' },
];

// --- ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ ---

export default function Home() {
  const containerRef = useRef(null);
  
  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });
  
  // Трансформации для Hero
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 250]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#030303] overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      
      {/* ==========================================
          СЕКЦИЯ 1: HERO (Космический Parallax)
          ========================================== */}
      <section className="relative h-[120vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
        
        {/* Анимированные световые пятна */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] bg-indigo-600/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.5, 1] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[10%] w-[45vw] h-[45vw] bg-purple-600/15 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
        />

        {/* Сетка на фоне */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none z-0"></div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="relative z-10 text-center px-4 flex flex-col items-center w-full max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-2 border border-white/10 rounded-full glass-panel mb-10 flex items-center gap-3 backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80">
              Сингулярность Образования
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            className="text-[11vw] md:text-[9vw] leading-[0.85] font-black tracking-tighter text-white drop-shadow-2xl"
          >
            FUTURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600 text-glow">
              UNIVERSITY.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 text-xl md:text-2xl text-white/50 max-w-3xl font-light tracking-wide leading-relaxed"
          >
            Мы не просто выдаем дипломы. Мы пишем исходный код вашей карьеры в топовых IT-корпорациях мира.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="flex flex-col sm:flex-row gap-6 mt-16">
            <Link to="/apply" className="group relative px-10 py-5 bg-white text-black font-black text-lg rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span className="relative z-10 flex items-center gap-2">Инициировать поступление <ArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
            </Link>
            <Link to="/specialties" className="px-10 py-5 glass-panel text-white font-bold text-lg rounded-full hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-3">
              <Terminal className="w-5 h-5 text-indigo-400" /> Архитектура программ
            </Link>
          </motion.div>
        </motion.div>

        {/* Плавный переход (Градиент) вниз */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-20"></div>
      </section>

      {/* ==========================================
          СЕКЦИЯ 2: БЕГУЩАЯ СТРОКА (Marquee)
          ========================================== */}
      <section className="py-8 border-y border-white/5 bg-[#080808] relative z-20 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex gap-20 text-4xl md:text-5xl font-black text-white/5 uppercase tracking-widest items-center"
        >
          {/* Дублируем массив для бесконечного скролла */}
          {[...MARQUEE_TEXTS, ...MARQUEE_TEXTS].map((text, i) => (
            <div key={i} className="flex items-center gap-20">
              <span className="hover:text-white/20 transition-colors duration-500 cursor-default">{text}</span>
              <span className="text-indigo-500/30 text-2xl">✦</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ==========================================
          СЕКЦИЯ 3: МАНИФЕСТ (Huge Typography)
          ========================================== */}
      <section className="py-40 px-4 max-w-6xl mx-auto relative z-20 flex justify-center">
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
          >
            <Fingerprint className="w-16 h-16 text-indigo-500 mx-auto mb-10 opacity-50" />
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
              Большинство вузов <span className="text-white/20">рассказывают</span> о технологиях. <br />
              Мы заставляем вас их <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">создавать.</span>
            </h2>
            <p className="mt-10 text-xl md:text-2xl text-white/40 font-light max-w-3xl mx-auto leading-relaxed">
              Забудьте про скучные лекции и устаревшие учебники. Наш кампус — это полигон. Вы будете писать код, ломать системы, проектировать нейросети и ошибаться. Потому что только так становятся лучшими.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          СЕКЦИЯ 4: BENTO GRID (Экосистема)
          ========================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
          
          {/* Блок 1: Код */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} 
            className="md:col-span-2 md:row-span-2 glass-panel glass-panel-hover rounded-[3rem] p-12 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <Code className="w-16 h-16 text-indigo-400 mb-8" />
            <h3 className="text-5xl font-black mb-6 tracking-tight text-white">Чистый Код.</h3>
            <p className="text-white/50 text-xl leading-relaxed mb-8">Никакой воды. С 1-го семестра вы контрибьютите в Open Source и решаете production-задачи для IT-гигантов.</p>
            <div className="flex gap-4">
              <span className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm font-bold border border-white/10">Rust</span>
              <span className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm font-bold border border-white/10">Go</span>
              <span className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm font-bold border border-white/10">Python</span>
            </div>
          </motion.div>

          {/* Блок 2: Quantum (С фоном) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} 
            className="md:col-span-1 md:row-span-2 glass-panel glass-panel-hover rounded-[3rem] p-10 flex flex-col justify-end relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620825937374-87fc1d62c30c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent"></div>
            <div className="relative z-10">
              <Cpu className="w-12 h-12 text-white mb-6" />
              <h3 className="text-3xl font-bold mb-4 text-white">AI Cluster</h3>
              <p className="text-white/50 text-lg">Собственные стойки NVIDIA A100 для ваших нейросетей.</p>
            </div>
          </motion.div>

          {/* Блок 3: CyberSec */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} 
            className="md:col-span-1 md:row-span-1 glass-panel glass-panel-hover rounded-[3rem] p-10 group flex flex-col items-start justify-center border-t-4 border-t-purple-500"
          >
            <Shield className="w-12 h-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-2">CyberSec Area</h3>
            <p className="text-white/40">Легальный полигон для хакинга.</p>
          </motion.div>

          {/* Блок 4: Гранты */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} 
            className="md:col-span-1 md:row-span-1 glass-panel glass-panel-hover rounded-[3rem] p-10 group flex flex-col items-start justify-center bg-indigo-900/10"
          >
            <Zap className="w-12 h-12 text-indigo-400 mb-6 animate-pulse" />
            <h3 className="text-2xl font-bold text-white mb-2">Full Grants</h3>
            <p className="text-white/40">Стипендии до 100%.</p>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          СЕКЦИЯ 5: ROADMAP (Академический Путь)
          ========================================== */}
      <section className="py-40 max-w-4xl mx-auto px-4 relative z-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black tracking-tighter text-white mb-6">Траектория <span className="text-indigo-500">Развития</span></h2>
          <p className="text-xl text-white/40">4 года, которые превратят вас из энтузиаста в Senior-специалиста.</p>
        </div>

        <div className="relative">
          {/* Вертикальная линия */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full"></div>
          
          {TIMELINE_STEPS.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Контент */}
              <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <div className="text-indigo-500 font-black text-xl mb-2">Курс {step.year}</div>
                <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/50 text-lg leading-relaxed">{step.desc}</p>
              </div>

              {/* Узел на линии */}
              <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-[#0a0a0a] border-4 border-indigo-500 rounded-full -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                {step.icon}
              </div>

              {/* Пустой блок для выравнивания */}
              <div className="hidden md:block w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==========================================
          СЕКЦИЯ 6: ОГРОМНАЯ СТАТИСТИКА
          ========================================== */}
      <section className="py-32 relative border-y border-white/5 bg-[#060606] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { n: '98%', l: 'Оффер до диплома' },
              { n: '150+', l: 'IT Партнеров' },
              { n: '4.9/5', l: 'Рейтинг программ' },
              { n: '$120M', l: 'Фонд стартапов' }
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: 'spring' }}>
                <div className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">{s.n}</div>
                <div className="text-lg text-indigo-400 font-bold uppercase tracking-widest">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          СЕКЦИЯ 7: ВЫПУСКНИКИ (Alumni)
          ========================================== */}
      <section className="py-40 max-w-7xl mx-auto px-4 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-black tracking-tighter text-white mb-4">Наш <span className="text-purple-500">Код</span> в Действии</h2>
            <p className="text-xl text-white/40 max-w-xl">Наши выпускники создают архитектуру мирового интернета.</p>
          </div>
          <Link to="/specialties" className="px-6 py-3 border border-white/20 rounded-full text-white font-bold hover:bg-white hover:text-black transition-colors">
            Смотреть все истории
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALUMNI.map((alumni, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel p-8 rounded-[2rem] border-t border-t-white/10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mb-6 flex items-center justify-center text-xl font-black text-white">
                {alumni.name.charAt(0)}
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{alumni.name}</h4>
              <p className="text-indigo-400 font-medium mb-4">{alumni.role}</p>
              <div className="text-sm text-white/30 font-bold uppercase tracking-widest">{alumni.year}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==========================================
          СЕКЦИЯ 8: ИНТЕРАКТИВНЫЙ FAQ
          ========================================== */}
      <section className="py-32 max-w-4xl mx-auto px-4 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black tracking-tighter text-white mb-6">База <span className="text-cyan-500">Знаний</span></h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const [isOpen, setIsOpen] = useState(false);
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel rounded-3xl overflow-hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="w-full px-8 py-6 flex justify-between items-center text-left">
                  <span className="text-xl font-bold text-white pr-8">{faq.question}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <ChevronDown className="text-white w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-8 pb-8 text-white/50 text-lg leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          СЕКЦИЯ 9: FINAL CTA (Вортекс)
          ========================================== */}
      <section className="py-40 relative overflow-hidden flex justify-center items-center text-center px-4">
        {/* Анимация портала на фоне */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="w-[800px] h-[800px] border border-white/5 rounded-full absolute"></motion.div>
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 140, repeat: Infinity, ease: "linear" }} className="w-[1000px] h-[1000px] border border-white/5 rounded-full absolute border-dashed"></motion.div>
          <div className="w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full absolute"></div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative z-10 glass-panel p-16 md:p-24 rounded-[4rem] border border-white/10 max-w-5xl w-full">
          <Globe className="w-20 h-20 text-indigo-500 mx-auto mb-10" />
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Готовы изменить систему?</h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12">Регистрация в портале занимает 3 минуты. Сделайте шаг навстречу карьере вашей мечты прямо сейчас.</p>
          
          <Link to="/apply" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black text-xl rounded-full hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-300">
            Запустить протокол <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
