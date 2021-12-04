from __init__ import db 
from flask_login import UserMixin
from sqlalchemy.orm import validates 
from werkzeug.security import (generate_password_hash, check_password_hash) 
import re
from datetime import datetime
import pytz
from sqlalchemy_serializer import SerializerMixin #to easily convert these table to_dict() i.e JSON


class User(db.Model, UserMixin, SerializerMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(30), unique= True)
    email = db.Column(db.String(200), unique= True)
    password_hash = db.Column(db.String(128))
    cart = db.relationship('CartItem') #to denote 1 to many relationship with SearchHistory 
    purchased_books = db.relationship('PurchasedItem')   

    def check_password(self, password): 
        return check_password_hash(self.password_hash, password)
    
    #data validation
    @validates('username') 
    def validate_username(self, key, username):
        if not username:
            raise AssertionError('No username provided')
        if User.query.filter(User.username == username).first():
            raise AssertionError('Username is already in use')
        if len(username) < 5 or len(username) > 20:
            raise AssertionError('Username must be between 5 and 20 characters') 
        return username 
    
    @validates('email') 
    def validate_email(self, key, email):
        if not email:
            raise AssertionError('No email provided')
        if User.query.filter(User.email == email).first():
            raise AssertionError('Email is already in use')
        if not re.match("[^@]+@[^@]+\.[^@]+", email):
            raise AssertionError('Provided email is not an email address') 
        return email
    
    #Handling the password validation is a little different, because we should only be updating the 
    #password_hash field using the set_password() method to hash our passwords. Since what we want to 
    #validate is the provided password, not the password_hash field, we can do our validation right 
    #in the set_password() method:
    def set_password(self, password):
        if not password:
            raise AssertionError('Password not provided')
        if len(password) < 8 or len(password) > 50:
            raise AssertionError('Password must be between 8 and 50 characters')
        if not re.match('\d.*[A-Z|a-z]|[A-Z|a-z].*\d', password):
            raise AssertionError('Password must contain at least 1 number')      
        self.password_hash = generate_password_hash(password)
    
    #to check if password matches for login    
    def check_password(self, password): 
        return check_password_hash(self.password_hash, password)
        
        
class PurchasedItem(db.Model, SerializerMixin):
    purchase_id = db.Column(db.Integer, primary_key = True)
    order_id = db.Column(db.Integer)
    book_isbn = db.Column(db.Integer)
    count = db.Column(db.Integer)
    date = db.Column(db.DateTime(timezone = True), default = datetime.now(pytz.timezone('Asia/Kathmandu')))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) #to relate the purchase history with the user
    

class CartItem(db.Model, SerializerMixin):
    cart_id = db.Column(db.Integer, primary_key = True)
    book_isbn = db.Column(db.Integer)
    count = db.Column(db.Integer)
    date = db.Column(db.DateTime(timezone = True), default = datetime.now(pytz.timezone('Asia/Kathmandu')))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    
