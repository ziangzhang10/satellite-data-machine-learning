var url =
  `https://raw.githubusercontent.com/ziangzhang10/data_bootcamp_final_project/master/engine/static/csv/cat_by_zip.csv`;


Plotly.d3.csv(url, function (err, csv) {
  csv.forEach(function(i) { 

    if (i["ZIP Code"] == "77003") {
      
      var data = [{
        type: "sunburst",
        labels: [csv[0]["ZIP Code"],            "Crops",        "Annual Crops",     "Permanent Crops",      "Water",       "River",  "Sea/Lake",      "Forest",         "Vegetation",        "Herbaceous",   "Pasture",    "Residential",         "Highway",          "Industrial" ],
        parents: [      "",                csv[0]["ZIP Code"],     "Crops",             "Crops",      csv[0]["ZIP Code"], "Water",    "Water",    "Vegetation",   csv[0]["ZIP Code"],     "Vegetation",   "Crops",     csv[0]["ZIP Code"],    csv[0]["ZIP Code"],  csv[0]["ZIP Code"] ],
        values:  [    parseInt(csv[0]["Total Blocks"]), 
                      parseInt(csv[0]["Annual Crop"]) + 
                      parseInt(csv[0]["Permanent Crop"])+ 
                      parseInt(csv[0]["Pasture"]),  
                      parseInt(csv[0]["Annual Crop"]),  
                      parseInt(csv[0]["Permanent Crop"]),  
                      parseInt(csv[0]["River"]) + parseInt(csv[0]["Sea Lake"]), 
                      parseInt(csv[0]["River"]),   
                      parseInt(csv[0]["Sea Lake"]),  
                      parseInt(csv[0]["Forest"]),      
                      parseInt(csv[0]["Forest"]) + parseInt(csv[0]["Herbaceous Vegetation"]), 
                      parseInt(csv[0]["Herbaceous Vegetation"]), 
                      parseInt(csv[0]["Pasture"]), 
                      parseInt(csv[0]["Residential"]), 
                      parseInt(csv[0]["Highway"]), 
                      parseInt(csv[0]["Industrial"])],
        outsidetextfont: {size: 20, color: "#377eb8"},
        leaf: {opacity: 0.4},
        marker: {line: {width: 2}},
  }];
  
  var layout = {
    margin: {l: 0, r: 0, b: 0, t: 0},
    width: 500,
    height: 500
  };

  Plotly.newPlot('plot', data, layout);

    }
    else {
      console.log("Not on my watch!");
    };


  });
}); 