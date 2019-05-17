import os
import numpy as np
import pandas as pd
import json
import geojson  # can't use geojson because Heroku is a b****

from flask import Flask, jsonify, render_template, url_for, request

app = Flask(__name__)
#Bootstrap(app) 


#################################################
# Static Databases
#################################################

@app.route("/zipcode_geojson")
def zipcode_geojson():
    """Return the geojson page for mapping."""
    THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
    # If you don't specify "THIS_FOLDER", the app can still run locally but won't render on Heroku
    # Brilliant, isn't it? Yeah, right...
    filepath = os.path.join(THIS_FOLDER, "static", "json", "zipcode.geojson")
    with open(filepath, 'r') as f:
        houston_geojson = geojson.load(f) 
    return jsonify(houston_geojson)

@app.route("/houston_geojson")
def houston_geojson():
    """Return the geojson page for mapping."""
    THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
    # If you don't specify "THIS_FOLDER", the app can still run locally but won't render on Heroku
    # Brilliant, isn't it? Yeah, right...
    filepath = os.path.join(THIS_FOLDER, "static", "json", "houston_.geojson")
    with open(filepath, 'r') as f:
        zipcode_geojson = geojson.load(f) 
    return jsonify(zipcode_geojson)

#################################################
# Perform analysis on response
#################################################

@app.route("/specific_analysis", methods = ["GET", "POST"])
def specific_analysis():
    """This is the specific analysis that pops out when you click a region, not the comprehensive one on the navbar."""
    if request.method == "POST":
        zipcode = request.form['zip'].replace('/','')
        print(zipcode)
        return render_template("specific_analysis.html", zip = zipcode)
    return render_template("specific_analysis.html")

@app.route("/map")
def map():
    """Return the map."""
    return render_template("map.html")

#################################################
# Homepage
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


if __name__ == "__main__":
    app.run()
