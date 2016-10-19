// =======================================================
// Use places variable below to get geo data in database
// =======================================================


$( function(){
  function initMap(){
    var mapCanvas = document.getElementById("map");
    var userID = document.getElementById('userID').value;


    var location = new google.maps.LatLng(37.09024, -100.712891);
    var contentString;

    var mapOptions = {
      center: location,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_LEFT
    }
      };

    //fire up map
    var map = new google.maps.Map(mapCanvas, mapOptions);

    // Marker
    var markerImage = "../images/dotIcon.png";
    var marker;
    var infowindow;
  // Set markers from locations in database
    var latLng = new google.maps.LatLng(40.74467899999999,-73.94854240000001);
    marker = new google.maps.Marker({
        position: latLng,
        map: map
      });

  //___________________________Autocomplete search______________________

  //Set default bounds for the autocomplete search results
  // The autocomplete will be biased towards the latlng set below
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(48.987386, -124.626080),
      new google.maps.LatLng(18.005611, -62.361014)
    );

    var Autocompleteinput = document.getElementById('autocompleteSearch');
    var options = {
      bounds: defaultBounds
    };

    searchBox = new google.maps.places.Autocomplete(Autocompleteinput, options);
    searchBox.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(Autocompleteinput);
    document.getElementById('autocompleteSearch').style.display = "block";

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    google.maps.event.addListener(searchBox, 'place_changed', function() {
        //TODO infowindow and marker are both being defined in this function.
        //write a conditional statement to check if infowindow is open and marker is on map
        if(infowindow !== undefined){
          infowindow.close();
          // //clear out old marker
          marker.setMap(null);
          marker.setVisible(false);
          console.log("cleared out infowindow and marker");
        }

        var place = searchBox.getPlace();
        console.log(place);
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
          map.setZoom(9);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        // Create a marker and infoWindow for searched place.
        marker = new google.maps.Marker({
          map: map,
          icon: markerImage,
          title: place.name,
          position: place.geometry.location
        });

        var html =
        '<div id="formContainer" class="info-window">' +
          '<h3>'+ place.name +'</h3>' +
          '<p>I hear ' + place.name + ' is great! Have you been here before? Please make a selection:</p> '+
          '<form action="/'+ userID +'/new/destinations" method="POST">'+
          '<div class="form-group">'+
                '<strong>Location:</strong> <input id="googleRes" type="text" name="destination[name]" value="'+ place.name +'"readonly></input>' +
                '<strong>Position:</strong> <input id="googleRes" type="text" name="destination[position]" value="'+ place.geometry.location +'" readonly></input>' +
              '</div>' +
              '<div class="form-group">'+
                  '<button id="wishListButton" type="submit" class="btn btn-warning">Save Location</button>' +
              '</div>' +
            '</form>' +
        '</div>';

        infowindow = new google.maps.InfoWindow({
          content: html,
          maxWidth: 400,
      });
      infowindow.open(map, marker);

        marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  }

  //wait till page finishes loading then runs code in initMap
  google.maps.event.addDomListener(window, 'load', initMap);
});
