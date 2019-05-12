

// magnitude to visuals of circle
var dict = {

};

// function for color of bubbles and legend
function getColor(d) {
  return d > 5  ? '#E31A1C' :
         d > 4  ? '#FC4E2A' :
         d > 3   ? '#FD8D3C' :
         d > 2   ? '#FEB24C' :
         d > 1   ? '#FED976' :
                    '#FFEDA0';
}

////////////////////////////////////////////////////////////////////////////////////////
// END PRELIMINARY
// BEGIN BASE MAP LAYERS
////////////////////////////////////////////////////////////////////////////////////////

// Define variables for our tile layers
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  "Light Map": light,
  "Dark Map": dark,
  "Satellite": satellite,
  "Outdoors": outdoors
};

////////////////////////////////////////////////////////////////////////////////////////
// END BASE MAP LAYERS
// BEGIN OVERLAY LAYERS
////////////////////////////////////////////////////////////////////////////////////////

// Overlays that may be toggled on or off
// var earthquakes = new L.LayerGroup();
// var faultlines = new L.LayerGroup();
var gerrymanders = new L.LayerGroup();

var overlayMaps = {
  // "Earthquakes": earthquakes,
  // "Fault Lines": faultlines
  "Gerrymanders": gerrymanders
};


////////////////////////////////////////////////////////////////////////////////////////
// END OVERLAY LAYERS
// BEGIN CREATING MAP
////////////////////////////////////////////////////////////////////////////////////////

// Create map object and set default layers
var myMap = L.map("map-id", {
  center: [29.76, -95.36],
  zoom: 12,
  layers: [satellite, gerrymanders]
});

// For the map to fill the window
$(window).on("resize", function () { $("#map-id").height($(window).height() * 0.75); myMap.invalidateSize(); }).trigger("resize");

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

////////////////////////////////////////////////////////////////////////////////////////
// END CREATING MAP
// BEGIN ADDING FAULT LINES
////////////////////////////////////////////////////////////////////////////////////////



// GITHUB RAW that's the way!
//url2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
url2 = `/houston_geojson`;
// for the faultlines
//fetch("tectonicplates-master/GeoJSON/PB2002_boundaries.json")
//  .then(function(data){
d3.json(url2, function (data) {
  console.log(typeof (data));
  L.geoJson(data, {
    // Style each feature (in this case a region)
    style: function (feature) {
      return {
        color: "red",

        fillOpacity: 0.3,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function (feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function (event) {
          hood = event.target;
          hood.setStyle({
            fillOpacity: 0.6
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function (event) {
          hood = event.target;
          hood.setStyle({
            fillOpacity: 0.3
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function (event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      //layer.bindPopup("<h1>" + feature.properties.ID + "</h1> <hr> <h2>" + feature.properties.Legend + "</h2>");
      layer.bindPopup("<h2>Region " + feature.properties.ID + " of type " + feature.properties.Legend + "</h2><hr>" + '<form role="form">  <button type="submit" class="btn btn-block"><span class="glyphicon glyphicon-scale"></span>            Analyze Region</button></form>');

    }
  }).addTo(gerrymanders);
});


////////////////////////////////////////////////////////////////////////////////////////
// END CREATING MAP
// BEGIN ADDING LEGEND
////////////////////////////////////////////////////////////////////////////////////////

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
// NEED TO CHANGE CSS AS WELL, ALAS..

legend.addTo(myMap);