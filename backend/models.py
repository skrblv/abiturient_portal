from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

class Specialty(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    duration = db.Column(db.String(50), nullable=False)
    qualification = db.Column(db.String(100), nullable=False)
    study_form = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "id": self.id, "name": self.name, "description": self.description,
            "duration": self.duration, "qualification": self.qualification, "study_form": self.study_form
        }

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id, "title": self.title, "content": self.content,
            "date_posted": self.date_posted.strftime("%Y-%m-%d %H:%M")
        }

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    specialty = db.Column(db.String(100), nullable=False)
    comment = db.Column(db.Text, nullable=True)
    date_submitted = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id, "first_name": self.first_name, "last_name": self.last_name,
            "email": self.email, "phone": self.phone, "specialty": self.specialty,
            "comment": self.comment, "date_submitted": self.date_submitted.strftime("%Y-%m-%d %H:%M")
        }
