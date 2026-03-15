import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { api } from '../api';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Award, LayoutGrid } from 'lucide-react';

interface Specialty {
  id: number;
  name: string;
  description: string;
  duration: string;
  qualification: string;
  study_form: string;
}

// Компонент Spotlight Карточки
const SpotlightCard = ({ s, index }: { s: Specialty, index: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 overflow-hidden group flex flex-col h-full"
    >
      {/* Магическое свечение за курсором */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(79,70,229,0.15), transparent 40%)`,
        }}
      />
      
      {/* Подсветка границы */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2.5rem] border-2 border-transparent opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(79,70,229,0.5), transparent 40%) border-box`,
          WebkitMask: `linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: `xor`,
          maskComposite: `exclude`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-4xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight leading-tight pr-8">
            {s.name}
          </h2>
          <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-500 bg-white/5">
            <ArrowUpRight className="w-6 h-6 text-white" />
          </div>
        </div>

        <p className="text-white/40 text-lg flex-grow leading-relaxed mb-10">
          {s.description}
        </p>

        <div className="grid grid-cols-1 gap-4 mb-10">
          <div className="flex items-center gap-4 text-white/70 bg-[#111] p-4 rounded-2xl border border-white/5">
            <Clock className="w-6 h-6 text-indigo-500" />
            <span className="font-medium text-base">Срок: <span className="text-white">{s.duration}</span></span>
          </div>
          <div className="flex items-center gap-4 text-white/70 bg-[#111] p-4 rounded-2xl border border-white/5">
            <Award className="w-6 h-6 text-purple-500" />
            <span className="font-medium text-base">Степень: <span className="text-white">{s.qualification}</span></span>
          </div>
          <div className="flex items-center gap-4 text-white/70 bg-[#111] p-4 rounded-2xl border border-white/5">
            <LayoutGrid className="w-6 h-6 text-cyan-500" />
            <span className="font-medium text-base">Формат: <span className="text-white">{s.study_form}</span></span>
          </div>
        </div>

        <Link to="/apply" className="w-full py-5 text-center rounded-2xl font-black text-lg bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-300">
          Подать документы
        </Link>
      </div>
    </motion.div>
  );
};

export default function Specialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  useEffect(() => {
    api.get('/specialties').then((res) => setSpecialties(res.data));
  }, []);

  return (
    <div className="min-h-screen pt-40 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-600/10 blur-[200px] pointer-events-none rounded-full"></div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-24 relative z-10">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-white">Матрица <span className="text-indigo-500">Дисциплин.</span></h1>
        <p className="text-2xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed">Выберите траекторию, которая приведет вас на вершину технологического мира. Каждая программа — это шедевр академической инженерии.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {specialties.map((s, index) => (
          <SpotlightCard key={s.id} s={s} index={index} />
        ))}
      </div>
    </div>
  );
}
