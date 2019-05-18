current_zipcode = document.getElementById('current_zipcode').textContent; //"value" doesn't work either. 
console.log(current_zipcode);



$(document).ready(function () {
    // Insert Bar graph and Pie chart

    var url =
      `https://raw.githubusercontent.com/ziangzhang10/data_bootcamp_final_project/master/engine/static/csv/cat_by_zip.csv`;


    Plotly.d3.csv(url, function (err, csv) {
      csv.forEach(function (i) {
        if (i["ZIP Code"] == current_zipcode) {
          flag_havedata = 1;
          var data = [{
            type: "sunburst",
            labels: [i["ZIP Code"], "Crops", "Annual Crops", "Permanent Crops", "Water", "River", "Sea/Lake", "Forest", "Vegetation", "Herbaceous", "Pasture", "Residential", "Highway", "Industrial"],
            parents: ["", i["ZIP Code"], "Crops", "Crops", i["ZIP Code"], "Water", "Water", "Vegetation", i["ZIP Code"], "Vegetation", "Crops", i["ZIP Code"], i["ZIP Code"], i["ZIP Code"]],
            values: [parseInt(i["Total Blocks"]),
            parseInt(i["Annual Crop"]) +
            parseInt(i["Permanent Crop"]) +
            parseInt(i["Pasture"]),
            parseInt(i["Annual Crop"]),
            parseInt(i["Permanent Crop"]),
            parseInt(i["River"]) + parseInt(i["Sea Lake"]),
            parseInt(i["River"]),
            parseInt(i["Sea Lake"]),
            parseInt(i["Forest"]),
            parseInt(i["Forest"]) + parseInt(i["Herbaceous Vegetation"]),
            parseInt(i["Herbaceous Vegetation"]),
            parseInt(i["Pasture"]),
            parseInt(i["Residential"]),
            parseInt(i["Highway"]),
            parseInt(i["Industrial"])],
            outsidetextfont: { size: 20, color: "#377eb8" },
            leaf: { opacity: 0.4 },
            marker: { line: { width: 2 } },
          }];

          var layout = {
            margin: { l: 0, r: 0, b: 0, t: 0 },
            width: 500,
            height: 500
          };

          Plotly.newPlot('myPie', data, layout);

          var data_h = [{
            type: "sunburst",
            labels: ["Houston", "Crops", "Annual Crops", "Permanent Crops", "Water", "River", "Sea/Lake", "Forest", "Vegetation", "Herbaceous", "Pasture", "Residential", "Highway", "Industrial"],
            parents: ["",     "Houston",    "Crops",           "Crops",     "Houston", "Water",   "Water",   "Vegetation",   "Houston",     "Vegetation", "Crops",  "Houston",     "Houston",   "Houston" ],
            values:  [8152,       584,          46,             368,              90,       22,      68,       172,        3732 ,          3560,         170,       1198,           648,       1743],
            outsidetextfont: {size: 20, color: "#377eb8"},
            leaf: {opacity: 0.4},
            marker: {line: {width: 2}},
          }];
          
          var layout_h = {
            margin: {l: 0, r: 0, b: 0, t: 0},
            width: 500,
            height: 500
          };
          
          Plotly.newPlot('myBar', data_h, layout_h);

        }
        // else {
        //   console.log("Not on my watch!");
        // };


      });
    }); 


    // Insert Image
    var img = new Image();
    var div = document.getElementById('myImg');
  
    img.onload = function () {
        div.appendChild(img);
    };
  
    img.src = '/static/images/zip_' + current_zipcode + '_rgb.jpg';
    img.onerror = function () {     
      // Insert Makeshift
      var img = new Image();
      var div = document.getElementById('myImg');
    
      img.onload = function () {
          div.appendChild(img);
          div.append("Sorry, no satellite images was found for ZIP Code "+ current_zipcode+ "!");
      };
    
      img.src = '/static/images/kings_landing.jpg';
   }


    // Initialize Tooltip
    $('[data-toggle="tooltip"]').tooltip(); 
    
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
  
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  })

