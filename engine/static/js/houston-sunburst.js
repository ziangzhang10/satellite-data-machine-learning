var data = [{
    type: "sunburst",
    labels: ["Houston", "Crops", "Annual Crops", "Permanent Crops", "Water", "River", "Sea/Lake", "Forest", "Vegetation", "Herbaceous", "Pasture", "Residential", "Highway", "Industrial"],
    parents: ["",     "Houston",    "Crops",           "Crops",     "Houston", "Water",   "Water",   "Vegetation",   "Houston",     "Vegetation", "Crops",  "Houston",     "Houston",   "Houston" ],
    values:  [8152,       584,          46,             368,              90,       22,      68,       172,        3732 ,          3560,         170,       1198,           648,       1743],
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