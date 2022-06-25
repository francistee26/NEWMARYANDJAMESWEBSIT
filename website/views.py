
from attr import define
from flask import Blueprint, redirect, render_template, request, flash, jsonify, url_for
from flask_login import login_required, current_user


views = Blueprint('views', __name__)


@views.route('/')
def logo():
    return render_template("index.html", user=current_user)

@views.route('/rsvp')
def rsvp():
    return render_template("rsvp.html",user=current_user)

@views.route('/rsvpform')
@login_required
def rsvpform():
    return render_template("rsvpform.html",user=current_user)

@views.route('/rsvpformtwo')
@login_required
def rsvpformtwo():
    return render_template("rsvpformtwo.html", user=current_user)

@views.route('/admin')
@login_required
def admin():
    id = current_user.id
    if id == 1:
        return render_template("admin.html",user=current_user)
    else:
        flash("You must be an admin user to access this page!")
        return redirect(url_for('views.rsvpform'))
