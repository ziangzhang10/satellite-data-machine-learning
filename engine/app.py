import os
import numpy as np
import pandas as pd
import json
import geojson  # can't use geojson because Heroku is a b****

from flask import Flask, jsonify, render_template, url_for, request, redirect

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

# @app.route("/specific_analysis", methods = ["GET", "POST"])
# def specific_analysis():
#     """This is the specific analysis that pops out when you click a region, not the comprehensive one on the navbar."""
#     if request.method == "POST":
#         zipcode = request.form['zip'].replace('/','')
#         print(zipcode)
#         return render_template("specific_analysis.html", zip = "00000")
#     return render_template("specific_analysis.html", zip = "11111")

@app.route("/specific_analysis")
def specific_analysis():
    """This is the specific analysis that pops out when you click a region, not the comprehensive one on the navbar."""
    return render_template("specific_analysis.html", zip = app.config['curzip'])

@app.route("/getzip", methods = ["GET", "POST"])
def getzip():
    """This is the specific analysis that pops out when you click a region, not the comprehensive one on the navbar."""
    if request.method == "POST":
        zipcode = request.form['zip'].replace('/','')
        app.config['curzip'] = zipcode
        return redirect('/specific_analysis', code=302)
    return "This didn't work"

@app.route("/map")
def map():
    """Return the map."""
    return render_template("map.html")

#################################################
# THE FOUR HORSEMAN ON THE NAVBAR
#################################################

@app.route("/analysis")
def analysis():
    """Return the analysis page (Tableau embedded)."""
    return render_template("analysis.html")

@app.route("/model")
def model():
    """Return the model page."""
    return render_template("model.html")

@app.route("/data")
def data():
    """Return the data page."""
    return render_template("data.html")

@app.route("/team")
def team():
    """Return the team page."""
    return render_template("team.html")

@app.route("/extras")
def extras():
    """Return the extras page."""
    return render_template("extras.html")

@app.route("/contact_us")
def contact_us():
    """Return the contact_us page."""
    return render_template("contact_us.html")

#################################################
# Homepage
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


if __name__ == "__main__":
    app.run()
