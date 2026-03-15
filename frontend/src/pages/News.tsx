import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../api';
import { Calendar, Clock, ArrowRight, Share2, TerminalSquare, Rss, ArrowUpRight } from 'lucide-react';

// ==========================================
// ИНТЕРФЕЙСЫ И УТИЛИТЫ
// ==========================================
interface NewsItem {
  id: number;
  title: string;
  content: string;
  date_posted: string;
}

// Расчет времени чтения (1 минута на 1000 символов)
const getReadingTime = (text: string) => {
  const time = Math.ceil(text.length / 800);
  return time > 0 ? time : 1;
};

// Генерация крутых картинок на основе ID (чтобы не было скучно без фото)
const getCoverImage = (id: number) => {
  const images = [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620825937374-87fc1d62c30c?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80',
  ];
  return images[id % images.length];
};

// ==========================================
// КОМПОНЕНТЫ КАРТОЧЕК
// ==========================================

// Главная новость (Featured)
const FeaturedNewsCard = ({ news }: { news: NewsItem }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative w-full rounded-[3rem] overflow-hidden glass-panel group mb-20 cursor-pointer"
  >
    <div className="flex flex-col lg:flex-row min-h-[500px]">
      {/* Изображение */}
      <div className="lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] z-10 hidden lg:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 block lg:hidden"></div>
        <img 
          src={getCoverImage(news.id)} 
          alt="Cover" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute top-8 left-8 z-20 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
          <TerminalSquare className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">Главное событие</span>
        </div>
      </div>
      
      {/* Контент */}
      <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-[#0a0a0a] relative z-20">
        <div className="flex items-center gap-6 mb-6 text-white/40 text-sm font-medium">
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {news.date_posted}</div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {getReadingTime(news.content)} мин чтения</div>
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight group-hover:text-indigo-400 transition-colors">
          {news.title}
        </h2>
        
        <p className="text-white/50 text-lg leading-relaxed mb-10 line-clamp-3">
          {news.content}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <button className="flex items-center gap-3 text-white font-bold text-lg group-hover:text-indigo-400 transition-colors">
            Читать протокол <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
          <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white/50 hover:text-white">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

// Обычная новость
const RegularNewsCard = ({ news, index }: { news: NewsItem, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.1 }}
    className="glass-panel rounded-[2rem] overflow-hidden group cursor-pointer flex flex-col h-full bg-[#0a0a0a]"
  >
    <div className="h-64 relative overflow-hidden">
      <img 
        src={getCoverImage(news.id + 5)} // +5 чтобы отличались картинки от главной
        alt="Cover" 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
      />
      <div className="absolute top-6 left-6 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
        Новости
      </div>
    </div>
    
    <div className="p-8 flex flex-col flex-grow">
      <div className="flex items-center gap-4 mb-4 text-white/40 text-xs font-medium uppercase tracking-wider">
        <span>{news.date_posted}</span>
        <span className="w-1 h-1 rounded-full bg-white/20"></span>
        <span>{getReadingTime(news.content)} MIN READ</span>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-indigo-400 transition-colors">
        {news.title}
      </h3>
      
      <p className="text-white/50 leading-relaxed mb-8 line-clamp-3 flex-grow">
        {news.content}
      </p>
      
      <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-auto">
        <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">Подробнее</span>
        <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-indigo-400 transition-colors" />
      </div>
    </div>
  </motion.div>
);

// ==========================================
// ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ
// ==========================================
export default function News() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Симуляция долгой загрузки для показа скелетонов (можно убрать setTimeout в проде)
    setTimeout(() => {
      api.get('/news').then((res) => {
        setNewsList(res.data);
        setLoading(false);
      });
    }, 800);
  }, []);

  const featuredNews = newsList.length > 0 ? newsList[0] : null;
  const restNews = newsList.length > 1 ? newsList.slice(1) : [];

  return (
    <div className="min-h-screen pt-40 pb-32 relative z-10">
      
      {/* ФОНОВЫЕ ЭФФЕКТЫ ДЛЯ СТРАНИЦЫ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-purple-600/10 blur-[200px] pointer-events-none rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ЗАГОЛОВОК СТРАНИЦЫ */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <Rss className="w-6 h-6 text-indigo-500" />
              <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Информационный хаб</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">Хроники.</h1>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden md:flex gap-2">
            {['Все', 'Технологии', 'Университет', 'Стартапы'].map((tag, i) => (
              <button key={i} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-white text-black' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5'}`}>
                {tag}
              </button>
            ))}
          </motion.div>
        </div>

        {/* КОНТЕНТ */}
        {loading ? (
          // Скелетоны при загрузке
          <div className="space-y-12">
            <div className="w-full h-[500px] rounded-[3rem] bg-white/5 animate-pulse border border-white/5"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(n => (
                <div key={n} className="h-[450px] rounded-[2rem] bg-white/5 animate-pulse border border-white/5"></div>
              ))}
            </div>
          </div>
        ) : newsList.length === 0 ? (
          // Пустое состояние
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 glass-panel rounded-[3rem]">
            <TerminalSquare className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">База данных пуста</h2>
            <p className="text-white/40 text-lg">Новостные протоколы еще не загружены в систему.</p>
          </motion.div>
        ) : (
          // Новости
          <div>
            {featuredNews && <FeaturedNewsCard news={featuredNews} />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restNews.map((news, index) => (
                <RegularNewsCard key={news.id} news={news} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* СЕКЦИЯ ПОДПИСКИ НА РАССЫЛКУ */}
        {!loading && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="mt-32 p-12 md:p-20 rounded-[3rem] glass-panel border border-indigo-500/20 bg-gradient-to-br from-[#0a0a0a] to-indigo-900/20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10">Оставайтесь в <span className="text-indigo-400">матрице.</span></h3>
            <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto relative z-10">Подпишитесь на наш дайджест, чтобы получать еженедельные выжимки о технологиях, грантах и жизни кампуса.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Ваш системный email..." 
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-white/30"
              />
              <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2">
                Синхронизировать <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}

      </div>
    </div>
  );
}
