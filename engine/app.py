import os
import numpy as np
import pandas as pd
import json
import geojson  # can't use geojson because Heroku is a b****

from flask import Flask, jsonify, render_template, url_for

app = Flask(__name__)
#Bootstrap(app) 


#################################################
# Database Setup
#################################################

@app.route("/houston_geojson")
def houston_geojson():
    """Return the geojson page for mapping."""
    THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
    # If you don't specify "THIS_FOLDER", the app can still run locally but won't render on Heroku
    # Brilliant, isn't it? Yeah, right...
    filepath = os.path.join(THIS_FOLDER, "static", "json", "houston_.geojson")
    with open(filepath, 'r') as f:
        houston_geojson = geojson.load(f) 
    return jsonify(houston_geojson)

@app.route("/specific_analysis")
def specific_analysis():
    """This is the specific analysis that pops out when you click a region, not the comprehensive one on the navbar."""
    return render_template("specific_analysis.html")

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
