from app import app, db
from models import Admin, Specialty, News, Application
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta

with app.app_context():
    db.create_all()
    
    if not Admin.query.filter_by(username='admin').first():
        admin = Admin(username='admin', password_hash=generate_password_hash('admin'))
        db.session.add(admin)
        print("✅ Добавлен администратор (Логин: admin / Пароль: admin)")

    if Specialty.query.count() == 0:
        specialties = [
            Specialty(
                name="Программная инженерия",
                description="Разработка программного обеспечения, архитектура высоконагруженных систем, искусственный интеллект и машинное обучение. Вы станете элитным разработчиком, способным создавать IT-продукты мирового уровня.",
                duration="4 года", qualification="Бакалавр (Инженер-программист)", study_form="Очная"
            ),
            Specialty(
                name="Дизайн и Медиакоммуникации",
                description="UX/UI дизайн, 3D-моделирование, моушен-дизайн и создание цифрового контента. Курс для тех, кто хочет создавать визуальное будущее цифровых продуктов.",
                duration="4 года", qualification="Бакалавр (Веб-дизайнер)", study_form="Очная / Очно-заочная"
            ),
            Specialty(
                name="Цифровая экономика и бизнес-аналитика",
                description="Симбиоз IT и бизнеса. Изучение Big Data, финансового моделирования и управления продуктами (Product Management). Управленческая элита нового поколения.",
                duration="4 года", qualification="Бакалавр (Бизнес-аналитик)", study_form="Очная"
            ),
            Specialty(
                name="Информационная безопасность",
                description="Защита данных, этичный хакинг (PenTest), криптография и противодействие киберугрозам. Самая востребованная профессия в эпоху цифровизации.",
                duration="5 лет", qualification="Специалист (Инженер по кибербезопасности)", study_form="Очная"
            )
        ]
        db.session.add_all(specialties)
        print("✅ Добавлены премиум-специальности")

    if News.query.count() == 0:
        news_items = [
            News(
                title="🚀 Открытие нового кампуса цифровых технологий",
                content="Мы рады сообщить об открытии ультрасовременного кампуса. В распоряжении студентов теперь есть лаборатории виртуальной реальности, коворкинги 24/7 и зоны отдыха с панорамным видом на город.\n\nЖдем всех на дне открытых дверей!",
                date_posted=datetime.utcnow() - timedelta(days=2)
            ),
            News(
                title="🏆 Наши студенты выиграли международный хакатон",
                content="Команда нашего университета заняла 1-е место на престижном хакатоне Global Tech 2024, разработав ИИ-систему для предсказания климатических изменений. Гордимся нашими талантами!",
                date_posted=datetime.utcnow() - timedelta(days=5)
            ),
            News(
                title="📅 Старт приемной кампании 2024",
                content="Уважаемые абитуриенты! Прием документов официально открыт. Вы можете подать заявку онлайн прямо на этом портале всего за пару кликов. Не упустите свой шанс получить профессию будущего.",
                date_posted=datetime.utcnow() - timedelta(days=10)
            )
        ]
        db.session.add_all(news_items)
        print("✅ Добавлены свежие новости")

    if Application.query.count() == 0:
        apps = [
            Application(first_name="Александр", last_name="Иванов", email="alex.ivanov@mail.com", phone="+7 (999) 123-45-67", specialty="Программная инженерия", comment="Мечтаю стать Senior Backend разработчиком."),
            Application(first_name="Елена", last_name="Смирнова", email="lena.sm@yandex.ru", phone="+7 (900) 765-43-21", specialty="Дизайн и Медиакоммуникации", comment="Есть портфолио на Behance, готовлюсь к поступлению."),
        ]
        db.session.add_all(apps)
        print("✅ Добавлены тестовые заявки")

    db.session.commit()
    print("🔥 База данных успешно инициализирована и готова к продакшену!")
