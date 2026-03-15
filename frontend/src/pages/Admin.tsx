import { useState, useEffect } from 'react';
import { api } from '../api';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'apps' | 'news' | 'specs'>('apps');
  
  const [apps, setApps] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [specs, setSpecs] = useState<any[]>([]);

  const [newNews, setNewNews] = useState({ title: '', content: '' });
  const [newSpec, setNewSpec] = useState({ name: '', description: '', duration: '', qualification: '', study_form: '' });

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { username, password });
      localStorage.setItem('token', res.data.access_token);
      setToken(res.data.access_token);
    } catch (err) { alert('Неверный логин или пароль'); }
  };

  const fetchData = async () => {
    if (!token) return;
    const [appRes, newsRes, specRes] = await Promise.all([api.get('/applications'), api.get('/news'), api.get('/specialties')]);
    setApps(appRes.data); setNews(newsRes.data); setSpecs(specRes.data);
  };

  useEffect(() => { fetchData(); }, [token]);

  const deleteItem = async (endpoint: string, id: number) => {
    if(!window.confirm('Точно удалить?')) return;
    await api.delete(`/${endpoint}/${id}`);
    fetchData();
  };

  const addNews = async (e: React.FormEvent) => {
    e.preventDefault(); await api.post('/news', newNews);
    setNewNews({ title: '', content: '' }); fetchData();
  };

  const addSpec = async (e: React.FormEvent) => {
    e.preventDefault(); await api.post('/specialties', newSpec);
    setNewSpec({ name: '', description: '', duration: '', qualification: '', study_form: '' }); fetchData();
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 pt-16">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in-up">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-8">Вход в систему</h2>
          <form onSubmit={login} className="space-y-5">
            <input type="text" placeholder="Логин (admin)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Пароль (admin)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" onChange={e => setPassword(e.target.value)} />
            <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors">Войти в панель</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-2">Панель управления порталом абитуриента</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="text-2xl font-bold text-indigo-600">{apps.length}</div>
              <div className="text-xs text-slate-500 uppercase font-semibold">Заявок</div>
            </div>
          </div>
        </div>

        {/* Навигация админки */}
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-max">
          <button onClick={() => setActiveTab('apps')} className={`px-6 py-2 rounded-xl font-semibold transition-colors ${activeTab === 'apps' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>Заявки</button>
          <button onClick={() => setActiveTab('news')} className={`px-6 py-2 rounded-xl font-semibold transition-colors ${activeTab === 'news' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>Новости</button>
          <button onClick={() => setActiveTab('specs')} className={`px-6 py-2 rounded-xl font-semibold transition-colors ${activeTab === 'specs' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>Специальности</button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in-up">
          
          {/* Вкладка Заявки */}
          {activeTab === 'apps' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Дата</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Абитуриент</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Контакты</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Специальность</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {apps.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-slate-500">Заявок пока нет.</td></tr>}
                  {apps.map(a => (
                    <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 text-sm text-slate-500 whitespace-nowrap">{a.date_submitted}</td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{a.first_name} {a.last_name}</div>
                        {a.comment && <div className="text-xs text-slate-500 mt-1 max-w-xs truncate" title={a.comment}>💬 {a.comment}</div>}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        <div>{a.email}</div>
                        <div>{a.phone}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">{a.specialty}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => deleteItem('applications', a.id)} className="text-red-500 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors text-sm">Удалить</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Вкладка Новости */}
          {activeTab === 'news' && (
            <div className="p-6 md:p-10 grid md:grid-cols-3 gap-10">
              <div className="md:col-span-1 border-r border-slate-100 pr-10">
                <h3 className="text-xl font-bold mb-6">Добавить новость</h3>
                <form onSubmit={addNews} className="space-y-4">
                  <input required placeholder="Заголовок" className="w-full p-3 rounded-xl border bg-slate-50 focus:bg-white outline-none" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} />
                  <textarea required placeholder="Текст новости" rows={6} className="w-full p-3 rounded-xl border bg-slate-50 focus:bg-white outline-none resize-none" value={newNews.content} onChange={e => setNewNews({...newNews, content: e.target.value})}></textarea>
                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-600 transition-colors">Опубликовать</button>
                </form>
              </div>
              <div className="md:col-span-2 space-y-4">
                {news.map(n => (
                  <div key={n.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl hover:border-slate-200 transition-colors">
                    <div>
                      <div className="font-bold text-slate-900">{n.title}</div>
                      <div className="text-xs text-slate-500">{n.date_posted}</div>
                    </div>
                    <button onClick={() => deleteItem('news', n.id)} className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition-colors">Удалить</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Вкладка Специальности */}
          {activeTab === 'specs' && (
            <div className="p-6 md:p-10 grid md:grid-cols-3 gap-10">
              <div className="md:col-span-1 border-r border-slate-100 pr-10">
                <h3 className="text-xl font-bold mb-6">Добавить программу</h3>
                <form onSubmit={addSpec} className="space-y-4">
                  <input required placeholder="Название" className="w-full p-3 rounded-xl border bg-slate-50 outline-none" value={newSpec.name} onChange={e => setNewSpec({...newSpec, name: e.target.value})} />
                  <textarea required placeholder="Описание" rows={3} className="w-full p-3 rounded-xl border bg-slate-50 outline-none resize-none" value={newSpec.description} onChange={e => setNewSpec({...newSpec, description: e.target.value})}></textarea>
                  <input required placeholder="Срок (напр. 4 года)" className="w-full p-3 rounded-xl border bg-slate-50 outline-none" value={newSpec.duration} onChange={e => setNewSpec({...newSpec, duration: e.target.value})} />
                  <input required placeholder="Квалификация" className="w-full p-3 rounded-xl border bg-slate-50 outline-none" value={newSpec.qualification} onChange={e => setNewSpec({...newSpec, qualification: e.target.value})} />
                  <input required placeholder="Форма обучения" className="w-full p-3 rounded-xl border bg-slate-50 outline-none" value={newSpec.study_form} onChange={e => setNewSpec({...newSpec, study_form: e.target.value})} />
                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-600 transition-colors">Сохранить</button>
                </form>
              </div>
              <div className="md:col-span-2 space-y-4">
                {specs.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl hover:border-slate-200">
                    <div>
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-xs text-slate-500">{s.qualification} • {s.duration}</div>
                    </div>
                    <button onClick={() => deleteItem('specialties', s.id)} className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100">Удалить</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
