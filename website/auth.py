import email
from flask import Blueprint, render_template, request, flash, redirect, url_for
# from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
# from . import db
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__)

@auth.route('/login',methods=['GET', 'POST'])
def login():
    return render_template("login.html")

@auth.route('/logout')
def logout():
    return render_template("index.html")

@auth.route('/signup',methods=['GET', 'POST'])
def sign_up():

    if request.method == "POST":
        email = request.form.get("email")
        username = request.form.get("username")
        password = request.form.get("password")
        password_confirm = request.form.get("passwordconfirm")
        
        if len(email) < 4:
            flash("Email must be greater than 4 characters.",category="error")
        elif len(username) < 2:
            flash("Username must be greater than 2 characters.",category="error")
        elif password != password_confirm:
            flash("Passwords don't match",category="error")
        elif len(password) < 7:
            flash("Password must be greater than 7 characters.",category="error")
        else:
            flash("Account was created!",category="success")
            # add user to database

    return render_template("signup.html")
