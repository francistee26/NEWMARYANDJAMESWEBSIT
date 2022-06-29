
from attr import define
from flask import Blueprint, redirect, render_template, request, flash, jsonify, url_for
from flask_login import login_required, current_user
from .models import RSVP
from . import db
import json

views = Blueprint('views', __name__)


@views.route('/',methods=['GET', 'POST'])
def logo():
    return render_template("index.html", user=current_user)

@views.route('/rsvpform',methods=['GET', 'POST'])
@login_required
def rsvpform():

    if request.method == 'POST':
        full_name = request.form.get('fullname')
        attending = request.form.get('attending')

        rsvp_member =  RSVP.query.filter_by(attendee_name=full_name).first()       
        if rsvp_member:
            if rsvp_member.attendee_name == full_name:
                flash('You have already RSVP successfully!', category='error')
        elif len(full_name) < 2:
            flash("Full name must be greater than 2 characters.",category="error")
        else:
            new_rsvp = RSVP(attendee_name=full_name,response=attending, user_id=1)
            db.session.add(new_rsvp)
            db.session.commit()
            new_rsvp2 = RSVP(attendee_name=full_name,response=attending, user_id=2)
            db.session.add(new_rsvp2)
            db.session.commit()
            flash('You have RSVP successfully!', category='success')

    return render_template("rsvpform.html",user=current_user)

@views.route('/admin',methods=['GET', 'POST'])
@login_required
def admin():
    id = current_user.id
    if id == 1 or id == 2:
        return render_template("admin.html",user=current_user)
    else:
        flash("You must be an admin user to access this page!")
        return redirect(url_for('views.rsvpform'))


@views.route('/delete-rsvp',methods=['GET', 'POST'])
def delete_rsvp():
    rsvp = json.loads(request.data)
    rsvpId = rsvp['rsvpId']
    rsvp = RSVP.query.get(rsvpId)
    if rsvp:
        if rsvp.user_id == current_user.id:
            db.session.delete(rsvp)
            db.session.commit()
    return jsonify({})