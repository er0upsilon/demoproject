from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager, login_manager
from flask_jwt_extended import JWTManager
import pandas as pd

db = SQLAlchemy()  # creating an instance of the SQLAlchemy
DB_NAME = "database.db"
store_data_cleaned = pd.read_csv(
    './DatasetCleaned.csv', low_memory=False)


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "bruh"

    # for setting up JWT
    app.config["JWT_SECRET_KEY"] = "yeet"
    jwt = JWTManager(app)

    # registering our blueprints
    from auth import auth
    from books import books
    from profile import profile
    from recommendation import recommendation
    app.register_blueprint(auth, url_prefix="/auth/")
    app.register_blueprint(books, url_prefix="/books/")
    app.register_blueprint(profile, url_prefix="/profile/")
    app.register_blueprint(recommendation, url_prefix="/recommendation/")

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # where db file is stored
    app.config["SQLALCHEMY_DATABASE_URI"] = f'sqlite:///{DB_NAME}'
    db.init_app(app)  # to tell the db belongs to the flask app

    # check if db exists, else create
    if not path.exists('api/'+DB_NAME):
        db.create_all(app=app)
        print('Created database')

    # login manager is need to handle login, logout, user, etc
    login_manager = LoginManager()
    login_manager.init_app(app)

    # import this here and not the top to avoid circular import
    from models.modelbase import User

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
    return app
