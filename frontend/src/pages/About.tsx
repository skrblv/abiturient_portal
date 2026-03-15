import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  Network, Code2, Globe2, Cpu, 
  Terminal, ShieldCheck, Database, LayoutTemplate 
} from 'lucide-react';

// Локальные данные команды (Стиль: Технологичные карточки)
const TEAM = [
  { name: 'Александр Громов', role: 'Ректор & Visionary', prev: 'ex-VP of Engineering, Yandex', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80' },
  { name: 'Екатерина Штерн', role: 'Декан факультета AI', prev: 'Ph.D. in Machine Learning, MIT', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80' },
  { name: 'Михаил Коваль', role: 'Head of CyberSec', prev: 'Lead Security Architect, Kaspersky', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80' },
  { name: 'David Chen', role: 'Head of Web3', prev: 'Smart Contract Auditor, ConsenSys', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80' },
];

export default function About() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="min-h-screen bg-[#030303] overflow-hidden">
      
      {/* 1. HERO СЕКЦИЯ (Огромный текст) */}
      <section className="relative h-screen flex items-center justify-center pt-20 px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Основано в 2012</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600 text-glow">
              Матрица
            </span> <br />
            Создателей.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-xl md:text-3xl text-white/40 max-w-4xl mx-auto font-light leading-relaxed">
            Мы отказались от концепции классического ВУЗа. Наша инфраструктура — это распределенный вычислительный кластер, где студенты не учатся, а создают продукты.
          </motion.p>
        </div>
      </section>

      {/* 2. СЕКЦИЯ С ФОТО КАМПУСА (Parallax) */}
      <section ref={targetRef} className="relative h-[60vh] md:h-[80vh] overflow-hidden my-20">
        <motion.div style={{ scale: scaleImage }} className="absolute inset-0 w-full h-full origin-center">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" alt="Campus" className="w-full h-full object-cover opacity-40" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] to-transparent"></div>
        <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Среда <br /> <span className="text-indigo-500">Обитания.</span></h2>
            <p className="text-2xl text-white/60 font-light leading-relaxed">
              Коворкинги 24/7, безлимитный кофе, зоны виртуальной реальности и лаборатории робототехники. Это не университет. Это Кремниевая Долина в миниатюре.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (Грид) */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black tracking-tighter text-white mb-6">Исходный код <span className="text-purple-500">Нашей Философии</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Code2 className="w-10 h-10 text-indigo-400" />, title: 'Practice First', desc: 'Теория мертва без практики. Мы изучаем алгоритм, пишем его на C++ и сразу деплоим на сервер. Никаких лекций под диктовку.' },
            { icon: <Network className="w-10 h-10 text-purple-400" />, title: 'Open Source Mindset', desc: 'Наши студенты контрибьютят в ядро Linux, React и Kubernetes. Ваше портфолио — это ваш GitHub с зеленой сеткой.' },
            { icon: <Globe2 className="w-10 h-10 text-cyan-400" />, title: 'Global Network', desc: 'Связи решают всё. Университет организует закрытые митапы с CTO топовых компаний и инвесторами из tier-1 фондов.' }
          ].map((val, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel p-10 rounded-[2.5rem] border-t border-t-white/10 group hover:bg-white/[0.04] transition-colors">
              <div className="mb-8 p-4 bg-white/5 w-max rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">{val.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{val.title}</h3>
              <p className="text-white/40 leading-relaxed text-lg">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. РЕКТОРАТ (TEAM) */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[200px] rounded-full pointer-events-none"></div>
        
        <h2 className="text-5xl font-black tracking-tighter text-white mb-16 text-center">Архитекторы <span className="text-indigo-400">Системы</span></h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group cursor-pointer">
              <div className="relative h-80 rounded-[2rem] overflow-hidden mb-6 border border-white/10">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white"><Terminal className="w-4 h-4" /></div>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white"><ShieldCheck className="w-4 h-4" /></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{member.name}</h3>
              <div className="text-indigo-500 font-bold mb-2">{member.role}</div>
              <div className="text-white/40 text-sm font-medium uppercase tracking-wider">{member.prev}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CTA СТАТИСТИКА */}
      <section className="py-40 bg-[#060606] border-t border-white/5 relative overflow-hidden">
        {/* Анимация бегущих цифр (Бинарный код на фоне) */}
        <div className="absolute inset-0 opacity-[0.02] font-mono text-xs overflow-hidden leading-none select-none pointer-events-none break-all text-white">
          {Array(200).fill('01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100 ').join('')}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter">Система готова. Ожидание <span className="text-indigo-500">Пользователя.</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
            {[
              { i: <Database className="w-8 h-8 text-indigo-400 mx-auto mb-4" />, n: '500TB', l: 'СХД для проектов' },
              { i: <Cpu className="w-8 h-8 text-purple-400 mx-auto mb-4" />, n: '10K+', l: 'GPU Cores' },
              { i: <Network className="w-8 h-8 text-cyan-400 mx-auto mb-4" />, n: '100Gbps', l: 'Оптика в кампусе' },
              { i: <LayoutTemplate className="w-8 h-8 text-pink-400 mx-auto mb-4" />, n: '24/7', l: 'Доступ в лабы' },
            ].map((s, i) => (
              <div key={i}>
                {s.i}
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{s.n}</div>
                <div className="text-sm font-bold text-white/40 uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
