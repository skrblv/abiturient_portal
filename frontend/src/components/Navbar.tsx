import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => { localStorage.removeItem('token'); navigate('/'); };
  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 top-0 transition-all duration-500 ${scrolled ? 'bg-[#030303]/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-black text-2xl group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">U</div>
            <span className="font-black text-2xl tracking-tighter text-white">FUTURE.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {[
              { path: '/specialties', label: 'Программы' },
              { path: '/rules', label: 'Правила' },
              { path: '/about', label: 'О нас' },
              { path: '/news', label: 'Журнал' },
            ].map((link) => (
              <Link key={link.path} to={link.path} className={`relative px-6 py-2.5 text-sm font-bold rounded-full transition-colors ${isActive(link.path) ? 'text-black' : 'text-white/50 hover:text-white'}`}>
                {isActive(link.path) && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white rounded-full" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link to="/apply" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full text-sm hover:bg-indigo-500 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              Поступить
            </Link>
            {token && (
              <div className="flex gap-4 border-l border-white/10 pl-6">
                <Link to="/admin" className="text-white/50 hover:text-white text-sm font-bold">Admin</Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-400 text-sm font-bold">Exit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
