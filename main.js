
var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

var songTitle, artist, songTitle2, artist2, id, songhtml, embedHtml;

$(document).ready(function() {
    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=tanzeelak&api_key=8fa0affd07885c7c5d5df7bf1f61a288&limit=2&format=json&callback=?", function(data) {

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


        });
    });

    $("#button").click(function() {
        $("#slide").addClass("enabled");
        $("#slide").removeClass("disabled");
        $("#overlay").addClass("enabled");
        $("#overlay").removeClass("disabled");
    });
    $("#cancel-area").click(function() {
        $("#slide").removeClass("enabled");
        $("#slide").addClass("disabled");
        $("#overlay").removeClass("enabled");
        $("#overlay").addClass("disabled");
    });

}); // close document ready function
