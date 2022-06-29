from urllib import response
from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    username = db.Column(db.String(150))
    attendee_responses = db.relationship("RSVP")
    
class RSVP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    attendee_name = db.Column(db.String(150))
    response = db.Column(db.String(12))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))