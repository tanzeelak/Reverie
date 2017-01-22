require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/geometry/Point",
  "esri/geometry/Polyline",
  "esri/geometry/Polygon",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "dojo/domReady!"
], function(
  Map, MapView,
  Graphic, Point, Polyline, Polygon,
  SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol
) {
  var map = new Map({
    basemap: "streets"
  });
  var view = new MapView({
    center: [-80, 35],
    container: "viewDiv",
    map: map,
    zoom: 3
  });

  function newPin(position){
     console.log('pin called!');
  var point = new Point({
    longitude: position.coords.longitude,
    latitude: position.coords.latitude
  });
  // Create a symbol for drawing the point
  var markerSymbol = new SimpleMarkerSymbol({
    color: [226, 119, 40],
    outline: { // autocasts as new SimpleLineSymbol()
      color: [255, 255, 255],
      width: 2
    }
  });
  // Create a graphic and add the geometry and symbol to it
  var pointGraphic = new Graphic({
    geometry: point,
    symbol: markerSymbol,
    popupTemplate: { // autocasts as new PopupTemplate()
      title: "{Name}",
      content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "Name"
        }, {
          fieldName: "Owner"
        }, {
          fieldName: "Length"
        }]
      }]
    }
  });
  // Create an object for storing attributes related to the line
  var lineAtt = {
    Name: "Keystone Pipeline",
    Owner: "TransCanada",
    Length: "3,456 km"
  };
  // Add the graphics to the view's graphics layer
  view.graphics.addMany([pointGraphic]);
}
    var x = document.getElementById("demo");
function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(newPin);
} else {
    x.innerHTML = "Geolocation is not supported by this browser.";
}
}
window.onload = function() {
   document.getElementById("btn").addEventListener("click", getLocation, false);
console.log("I hate javascript");
}
  /**********************
   * Create a point graphic
   **********************/
  // First create a point geometry (this is the location of the Titanic)

});
