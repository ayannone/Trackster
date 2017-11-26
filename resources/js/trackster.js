$(document).ready(function() {

  const API_KEY = "32dd61d5bab6768b5a133e9e12ab0bc7";

  var Trackster = {};

  $('#search-button').click(function() {
    var $searchValue = $('#search-input').val();
    Trackster.searchTracksByTitle($searchValue);
  });

  /*
    Given an array of track data, create the HTML for a Bootstrap row for each.
    Append each "row" to the container in the body to display all tracks.
  */
  Trackster.renderTracks = function(tracks) {
    // console.log(tracks);
    var amountTracks = tracks.results.trackmatches.track.length;

    for (i = 0; i < amountTracks; i++) {
      var currentTrack = tracks.results.trackmatches.track[i];

      var url = currentTrack['url'];
      var song = currentTrack['name'];
      var artist = currentTrack['artist'];
      var albumart = currentTrack['image'][0]['#text'];
      var listeners = currentTrack['listeners'];

      var $track = $(
        "<div class='row'>" +
          "<div class='col-xs-1 col-xs-offset-1 play-button'>" +
          "<a href='" + url + "' target='_blank' ><i class='fa fa-play-circle-o fa-2x'></i></a>" +
        "</div>" +
        "<div class='col-xs-4'>" +
          "<span>" + song + "</span>" +
        "</div>" +
        "<div class='col-xs-2'>" +
          "<span>" + artist + "</span>" +
        "</div>" +
        "<div class='col-xs-2'>" +
          "<span>" + albumart + "</span>" +
        "</div>" +
        "<div class='col-xs-2'>" +
          "<span>" + listeners + "</span>" +
        "</div>" +
      "</div>");

      // console.log($track);
      $('#tracklist').append($track);
    }
  };

  /*
    Given a search term as a string, query the LastFM API.
    Render the tracks given in the API query response.
  */
  Trackster.searchTracksByTitle = function(title) {
    $.ajax({
      url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
      datatype: 'jsonp',
      success: function(data) {
        Trackster.renderTracks(data);
      }
    })
  };

})
