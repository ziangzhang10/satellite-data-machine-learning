import os
import numpy as np
import pandas as pd
import json
import geojson


# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
#from flask_bootstrap import Bootstrap

#import sqlite3

app = Flask(__name__)
#Bootstrap(app) 


#################################################
# Database Setup
#################################################

#app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/austin_animals_db.sqlite" # for local
#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL_1', '') # for heroku
#db = SQLAlchemy(app)


# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# # Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
# Samples = Base.classes.samples

@app.route("/houston_geojson")
def houston_geojson():
    """Return the geojson page for mapping."""
    filepath = os.path.join("static", "json", "houston_.geojson")
    with open(filepath, 'r') as f:
        houston_geojson = geojson.load(f)
    return jsonify(houston_geojson)

@app.route("/map")
def map():
    """Return the map."""
    return render_template("map.html")

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


if __name__ == "__main__":
    app.run()
