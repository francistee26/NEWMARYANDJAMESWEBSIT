
from attr import define
from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user

views = Blueprint('views', __name__)


@views.route('/')
def logo():
    return render_template("index.html")

@views.route('/rsvp')
def rsvp():
    return render_template("rsvp.html")

@views.route('/rsvpform')
def rsvpform():
    return render_template("rsvpform.html")

@views.route('/login')
def login():
    return render_template("login.html")
