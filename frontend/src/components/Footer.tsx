import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 lg:py-24 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-500/30">
                U
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Future<span className="text-indigo-400">University</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm pr-4">
              Ведущий инновационный университет цифровой экономики и технологий. Мы не просто учим — мы создаем будущее вместе с нашими студентами.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300">
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Поступающим</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/specialties" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Программы обучения</Link></li>
              <li><Link to="/rules" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Правила приема</Link></li>
              <li><Link to="/apply" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Подать заявку онлайн</Link></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> День открытых дверей</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Общежитие и кампус</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Об университете</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">История и миссия</Link></li>
              <li><Link to="/news" className="hover:text-indigo-400 transition-colors">Новости и события</Link></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Руководство</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Наука и инновации</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Карьера и вакансии</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Контакты</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>123456, г. Москва,<br />Инновационный проспект, д. 1, Кампус А</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="font-medium text-white">+7 (495) 999-00-00</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>admission@future-university.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Future University. Все права защищены. Лицензия №12345678 от Рособрнадзора.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Карта сайта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
