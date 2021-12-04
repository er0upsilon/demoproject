from flask import json, request, jsonify
from flask.blueprints import Blueprint
from __init__ import db
#flask_login help us to manage user, make sure you've inherited UserMixin in the User model class
from flask_login import login_user, logout_user, login_required, current_user
from flask_jwt_extended import create_access_token
from models.modelbase import User
from flask_jwt_extended import jwt_required

auth = Blueprint('auth',__name__)

@auth.route('/signup', methods=["POST"])
def signup():
    request_data = request.get_json()
    username = request_data.get('username')
    email = request_data.get('email')
    password = request_data.get('password')
  
    try:
        new_user = User(email=email, username=username)
        new_user.set_password(password)    
        db.session.add(new_user) 
        db.session.commit() 
        login_user(new_user, remember=True) #log the user in to flask_login
        access_token = create_access_token(identity=email) #JWT token
        return jsonify(msg='User successfully created', user_id = current_user.id, access_token = access_token), 201 
    except Exception as e: 
        print(e)
        return jsonify(msg="Some Error occured", errmsg=str(e)), 400
    
    
@auth.route('/login', methods=["POST"])
def login():
    request_data = request.get_json()
    email = request_data.get('email')
    password = request_data.get('password')
    
    user = User.query.filter_by(email = email).first()
    if user:
        if user.check_password(password):
            login_user(user, remember=True) #log the user in to flask_login
            access_token = create_access_token(identity=email) #JWT token
            return jsonify(msg="User successfully logged in", user_id = current_user.id, access_token=access_token), 200
        else:
            return jsonify(msg="Incorrect password"), 401
    else:
        return jsonify(msg="User doesn't exist"), 401
    

@auth.route('getcurrentuser', methods=["GET"])
@login_required
@jwt_required()
def getCurrentUser():
    if current_user:
        return current_user.to_dict(), 200
    return jsonify(msg="User not logged in"), 401
    
    
@auth.route('/logout', methods=["GET"])
@login_required
@jwt_required()
def logout():
    logout_user()
    return jsonify(msg="User logged out"), 200








