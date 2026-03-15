export default function Contacts() {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">Будем на связи</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Остались вопросы? Мы всегда готовы помочь вам сделать правильный выбор.</p>
        </div>

        {/* Карточки отделов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: 'Приемная комиссия', phone: '+7 (495) 123-45-67', email: 'admission@fu.edu', desc: 'Вопросы поступления, подачи документов и рейтингов.', icon: '🎓' },
            { title: 'Студенческий офис', phone: '+7 (495) 123-45-68', email: 'students@fu.edu', desc: 'Справки, общежитие, стипендии и материальная помощь.', icon: '🏢' },
            { title: 'Ректорат', phone: '+7 (495) 123-45-00', email: 'rector@fu.edu', desc: 'Официальные запросы, партнерство и сотрудничество.', icon: '🏛️' }
          ].map((dept, i) => (
            <div key={i} className="glass-card p-10 hover:-translate-y-2 transition-transform bg-white">
              <div className="text-5xl mb-6">{dept.icon}</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{dept.title}</h3>
              <p className="text-slate-600 mb-6">{dept.desc}</p>
              <div className="space-y-2 text-lg font-medium text-slate-800">
                <div className="flex items-center gap-3"><span className="text-indigo-500">📞</span> {dept.phone}</div>
                <div className="flex items-center gap-3"><span className="text-indigo-500">✉️</span> {dept.email}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Блок с Картой и Формой */}
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
          {/* Левая часть: Форма быстрой связи */}
          <div className="lg:w-1/2 p-12 lg:p-16 bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
            <h2 className="text-3xl font-extrabold mb-8">Напишите нам напрямую</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-indigo-200 mb-2">Ваше имя</label>
                <input type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:bg-white/20 transition-all" placeholder="Алексей" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-indigo-200 mb-2">Email</label>
                <input type="email" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:bg-white/20 transition-all" placeholder="alex@mail.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-indigo-200 mb-2">Сообщение</label>
                <textarea rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-400 focus:bg-white/20 transition-all resize-none" placeholder="У меня есть вопрос по поводу..."></textarea>
              </div>
              <button type="button" onClick={() => alert('В демо-версии сообщение отправлено!')} className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl shadow-lg transition-colors">
                Отправить сообщение
              </button>
            </form>
          </div>
          
          {/* Правая часть: Карта (Iframe Placeholder) */}
          <div className="lg:w-1/2 relative min-h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.426218731383!2d37.62017251593121!3d55.75114708055375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2sThe%20Moscow%20Kremlin!5e0!3m2!1sen!2sru!4v1655208573273!5m2!1sen!2sru" 
              className="absolute inset-0 w-full h-full border-0" 
              loading="lazy"
              title="Map"
            ></iframe>
            <div className="absolute bottom-6 left-6 right-6 bg-white p-6 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-lg">Главный кампус</div>
                <div className="text-slate-500">г. Москва, ул. Инновационная, 1</div>
              </div>
              <a href="#" className="bg-slate-100 p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-semibold text-slate-700">Маршрут</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
