from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Admin, Specialty, News, Application
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portal.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret-key-change-in-production' 

db.init_app(app)
jwt = JWTManager(app)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    admin = Admin.query.filter_by(username=data.get('username')).first()
    if admin and check_password_hash(admin.password_hash, data.get('password')):
        access_token = create_access_token(identity=admin.username)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Неверный логин или пароль"}), 401

@app.route('/api/specialties', methods=['GET'])
def get_specialties():
    specialties = Specialty.query.all()
    return jsonify([s.to_dict() for s in specialties]), 200

@app.route('/api/specialties', methods=['POST'])
@jwt_required()
def add_specialty():
    data = request.json
    new_spec = Specialty(
        name=data['name'], description=data['description'],
        duration=data['duration'], qualification=data['qualification'], study_form=data['study_form']
    )
    db.session.add(new_spec)
    db.session.commit()
    return jsonify(new_spec.to_dict()), 201

@app.route('/api/specialties/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_specialty(id):
    spec = Specialty.query.get_or_404(id)
    db.session.delete(spec)
    db.session.commit()
    return jsonify({"msg": "Специальность удалена"}), 200

@app.route('/api/news', methods=['GET'])
def get_news():
    news = News.query.order_by(News.date_posted.desc()).all()
    return jsonify([n.to_dict() for n in news]), 200

@app.route('/api/news', methods=['POST'])
@jwt_required()
def add_news():
    data = request.json
    new_news = News(title=data['title'], content=data['content'])
    db.session.add(new_news)
    db.session.commit()
    return jsonify(new_news.to_dict()), 201

@app.route('/api/news/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_news(id):
    news = News.query.get_or_404(id)
    db.session.delete(news)
    db.session.commit()
    return jsonify({"msg": "Новость удалена"}), 200

@app.route('/api/applications', methods=['POST'])
def submit_application():
    data = request.json
    new_app = Application(
        first_name=data['first_name'], last_name=data['last_name'],
        email=data['email'], phone=data['phone'],
        specialty=data['specialty'], comment=data.get('comment', '')
    )
    db.session.add(new_app)
    db.session.commit()
    return jsonify({"msg": "Заявка успешно отправлена!"}), 201

@app.route('/api/applications', methods=['GET'])
@jwt_required()
def get_applications():
    apps = Application.query.order_by(Application.date_submitted.desc()).all()
    return jsonify([a.to_dict() for a in apps]), 200

@app.route('/api/applications/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_application(id):
    app_to_delete = Application.query.get_or_404(id)
    db.session.delete(app_to_delete)
    db.session.commit()
    return jsonify({"msg": "Заявка удалена"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
