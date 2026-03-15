import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Компоненты
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Убедитесь, что создали Footer.tsx из прошлых ответов

// Страницы
import Home from './pages/Home';
import Specialties from './pages/Specialties';
import Apply from './pages/Apply';
import News from './pages/News';
// Заглушки для остальных страниц (можете потом заменить на полноценные)
import About from './pages/About';
import Rules from './pages/Rules';
import Contacts from './pages/Contacts';
import Admin from './pages/Admin';

// ==========================================
// ГЛОБАЛЬНЫЙ ФОН И ЭФФЕКТЫ
// ==========================================
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Шум */}
    <div className="absolute inset-0 bg-noise mix-blend-screen opacity-30"></div>
    {/* Медленно плавающие неоновые сферы */}
    <motion.div 
      animate={{ 
        x: [0, 100, -100, 0], 
        y: [0, -100, 100, 0],
        scale: [1, 1.2, 0.8, 1]
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen"
    />
    <motion.div 
      animate={{ 
        x: [0, -100, 100, 0], 
        y: [0, 100, -100, 0],
        scale: [1, 0.8, 1.2, 1]
      }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen"
    />
  </div>
);

// ==========================================
// ОБЕРТКА ДЛЯ АНИМАЦИИ ПЕРЕХОДОВ
// ==========================================
const AnimatedRoutes = () => {
  const location = useLocation();

  // Прокрутка наверх при смене страницы
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Оборачиваем каждый Route в motion.div для Fade In/Out эффекта */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/specialties" element={<PageWrapper><Specialties /></PageWrapper>} />
        <Route path="/apply" element={<PageWrapper><Apply /></PageWrapper>} />
        <Route path="/news" element={<PageWrapper><News /></PageWrapper>} />
        
        {/* Базовые страницы */}
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/rules" element={<PageWrapper><Rules /></PageWrapper>} />
        <Route path="/contacts" element={<PageWrapper><Contacts /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

// Компонент-обертка для анимации конкретной страницы
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="w-full flex-grow flex flex-col relative z-10"
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#030303] text-white relative selection:bg-indigo-500/30 selection:text-white font-sans">
        <AmbientBackground />
        
        {/* Кастомный курсор скрыт на мобильных устройствах через CSS, но логика работает */}
        <div className="hidden lg:block">
          {/* <CustomCursor /> */}
        </div>

        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow flex flex-col relative z-10">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
}
