from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

api = Flask(__name__)
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# Initialize database
db = SQLAlchemy(api)

class Customer(db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	first_name = db.Column(db.String(25), nullable=False)
	last_name = db.Column(db.String(25), nullable=False)
	email = db.Column(db.String(50), nullable=False, unique=True)
	password = db.Column(db.String(50), nullable=False)
	smart_contract = db.Column(db.String(200), unique=True)
	date_created = db.Column(db.DateTime, default=datetime.utcnow())
	profile_pic = db.Column(db.LargeBinary)
	about = db.Column(db.Text)

	def __init__(self, fn, ln, email, passw):
		self.first_name = fn
		self.last_name = ln
		self.email = email
		self.password = passw

	def __repr__(self):
		return '<Name %r>' % self.id

class Business(db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	name = db.Column(db.String(25), nullable=False)
	email = db.Column(db.String(50), nullable=False)
	password = db.Column(db.String(50), nullable=False)
	smart_contract = db.Column(db.String(200), unique=True)
	image = db.Column(db.LargeBinary)
	about = db.Column(db.Text)

	def __init__(self, name, email, passw):
		self.name = name
		self.email = email
		self.password = passw

	def __repr__(self):
		return '<Name %r>' % self.id

class Product(db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	name = db.Column(db.String(25), nullable=False)
	businessId = db.Column(db.Integer, db.ForeignKey('business.id'), nullable=False)
	image = db.Column(db.LargeBinary)
	about = db.Column(db.Text)
	price = db.Column(db.Numeric(scale=2))

	def __init__(self, name, businessId):
		self.name = name
		self.businessId = businessId

	def __repr__(self):
		return '<Name %r>' % self.id

@api.route('/profile', methods=["GET"])
def my_profile():
	response_body = {
		"name": "Nagato",
		"about" :"Hello! I'm a full stack developer that loves python and javascript"
	}

	return response_body

