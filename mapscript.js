require([
  "esri/Map",
  "esri/views/SceneView",
  "dojo/domReady!"
], function(Map, SceneView){
  var map = new Map({
    basemap: "streets",
    ground: "world-elevation"
  });
  var view = new SceneView({
    container: "viewDiv",     // Reference to the scene div created in step 5
    map: map,                 // Reference to the map object created before the scene
    scale: 50000000,          // Sets the initial scale to 1:50,000,000
    center: [34.41, 119.84]  // Sets the center point of view with lon/lat
  });
   function initFunc(map ) {
          if( navigator.geolocation ) {  
            navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
            watchId = navigator.geolocation.watchPosition(showLocation, locationError);
          } else {
            alert("Browser doesn't support Geolocation. Visit http://caniuse.com to see browser support for the Geolocation API.");
          }
        }

        function locationError(error) {
          //error occurred so stop watchPosition
          if( navigator.geolocation ) {
            navigator.geolocation.clearWatch(watchId);
          }
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location not provided");
              break;

            case error.POSITION_UNAVAILABLE:
              alert("Current location not available");
              break;

            case error.TIMEOUT:
              alert("Timeout");
              break;

            default:
              alert("unknown error");
              break;
          }
        }


        function zoomToLocation(location) {
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          addGraphic(pt);
          map.centerAndZoom(pt, 12);
        }

        function showLocation(location) {
          //zoom to the users location and add a graphic
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          if ( !graphic ) {
            addGraphic(pt);
          } else { // move the graphic if it already exists
            graphic.setGeometry(pt);
          }
          map.centerAt(pt);
        }
       
        function addGraphic(pt){
          var symbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CIRCLE,
            12,
            new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID,
              new Color([210, 105, 30, 0.5]),
              8
            ),
            new Color([210, 105, 30, 0.9])
          );
          graphic = new Graphic(pt, symbol);
          map.graphics.add(graphic);
        }
});
