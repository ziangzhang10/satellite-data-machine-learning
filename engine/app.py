import os
import numpy as np
import pandas as pd
import json
import geojson  # can't use geojson because Heroku is a b****


from flask import Flask, jsonify, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
#from flask_bootstrap import Bootstrap

#import sqlite3

app = Flask(__name__)
#Bootstrap(app) 


#################################################
# Database Setup
#################################################

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
