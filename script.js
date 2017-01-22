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

    function newPin(position) {
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

        $.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=tanzeelak&api_key=8fa0affd07885c7c5d5df7bf1f61a288&limit=2&format=json&callback=?", function(data) {
            var songTitle, artist, songTitle2, artist2, id, songhtml, embedHtml;
            var html = ''; // we declare the variable that we'll be using to store our information
            var counter = 1; // we declare a counter variable to use with the if statement in order to limit the result to 1
            $.each(data.recenttracks.track, function(i, item) {
                if(counter == 1) {
                    songTitle = item.name;
                    artist = item.artist['#text'];
                    html += 'Currently listening to: <span><a href="' + item.url + '" target="_blank">' + songTitle + '</a> - ' + artist + '</span>';
                    console.log("haha" + html);
                    console.log(songTitle);
                } // close the if statement
                counter++ // add 1 to the counter variable each time the each loop runs
            }); // close each loop
            $('.listening-to h5').append(html); // print the information to the document - here I look for the h5 tag inside the div with a class of 'listening-to' and use the jQuery append method to insert the information we've stored in the html variable inside the h5 tag.

            songTitle2 = songTitle.split(' ').join('%20');
            artist2 =  artist.split(' ').join('%20');

            songhtml = "https://api.spotify.com/v1/search?q=track:" + songTitle2 + "%20artist:" + artist2 + "&limit=1&type=track"
            console.log("wassup");
            console.log(songhtml);
            $.getJSON(songhtml, function(data){

                $.each(data.tracks.items, function(i, item){
                    id = item.id;
                    console.log(id);
                });

                var iframeSrc = "https://embed.spotify.com/?uri=spotify:track:" + id
                console.log(iframeSrc);
                embedHtml = '<iframe src="' + iframeSrc + '" frameborder="0" allowtransparency="true"></iframe>';
                console.log(embedHtml);
                $('.showSong').append(embedHtml);

                // Create a graphic and add the geometry and symbol to it
                var pointGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol,
                    popupTemplate: { // autocasts as new PopupTemplate()
                        title: "{Name}",
                        content: embedHtml
                    }
                });

                // Add the graphics to the view's graphics layer
                view.graphics.addMany([pointGraphic]);
            });
        });

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
