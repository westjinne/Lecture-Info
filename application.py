from flask import Flask, render_template, request, redirect
from flask import url_for, flash, jsonify
from sqlalchemy import create_engine, desc, Column, ForeignKey, Integer, String
from sqlalchemy.orm import sessionmaker, relationship

from db_setup import Base, College, Lecture
from flask import make_response
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
   
import os
import sys
import httplib2
import json
import requests
import string
import random

app = Flask(__name__)

engine = create_engine('sqlite:///lectures.db')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

db = SQLAlchemy(app)

@app.route('/')
@app.route('/main/')
def showMain():
    colleges = session.query(College).all()
    return render_template('main_public.html', name = colleges)


@app.route('/college/create', methods = ['GET', 'POST'])
def createCollege():
    colleges = session.query(College).all()
    if request.method == 'POST':
        newCollege = College(name = request.form['name'])
        print(newCollege.name)
        session.add(newCollege)
        session.commit()
        flash("New College %s successfully created!" % newCollege.name)
        return redirect(url_for('showMain'))
    else:
        return render_template('create_college.html', name = colleges)

@app.route('/college/<int:college_id>/edit', methods = ['GET', 'POST'])
def editCollege(college_id):
    editedCollege = session.query(College).filter_by(id = college_id).one()
    if request.method == 'POST':
        if request.form['name']:
            editedCollege.name = request.form['name']
            flash('College %s successfully edited!' % editedCollege.name)
            return redirect(url_for('showMain'))
    else:
        return render_template('edit_college.html', college = editedCollege, name = college_name)

@app.route('/lecture/add')
def addLecture():
    colleges = session.query(College).all()
    return render_template('new_lecture.html', name = colleges)
"""
    pre_lectures = session.query(Lecture).all()
    if request.method == 'POST':
        newLecture = Lecture()
        
"""

@app.route('/college/info', methods = ['GET', 'POST'])
def showCollegeInfo():
    colleges = session.query(College).all()
    
    return render_template('show_college.html', name = colleges)
    
@app.route('/test/')
def JSTest():
    return render_template('index.html')


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
