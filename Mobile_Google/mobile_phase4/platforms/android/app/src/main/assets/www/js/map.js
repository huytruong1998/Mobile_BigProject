var map, infoWindow;
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 40.771, lng: -73.974}
        });//show map
//SHOW DESTIONATION
        var markerArray = [];

        // Instantiate a directions service.
        var directionsService = new google.maps.DirectionsService;

        var service = new google.maps.DistanceMatrixService;

        // Create a map and center it on Manhattan.
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 40.771, lng: -73.974}
        });

        // Create a renderer for directions and bind it to the map.
        var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

        // Instantiate an info window to hold step text.
        var stepDisplay = new google.maps.InfoWindow;

        // Display the route between the initial start and end selections.
        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, map);
        // Listen to change events from the start and end lists.
        var onChangeHandler = function() {
          calculateAndDisplayRoute(
              directionsDisplay, directionsService, markerArray, stepDisplay, map, service);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);

//SHOW LOCATION
  infoWindow = new google.maps.InfoWindow;
       // Try HTML5 geolocation.
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
           var pos = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };
           document.getElementById('longitude').value ="longitude: "+   position.coords.longitude;
           document.getElementById('latitude').value ="latitude: "+  position.coords.latitude;
           infoWindow.setPosition(pos);
           infoWindow.setContent('Location found.');
           infoWindow.open(map);
           map.setCenter(pos);
         }, function() {
           handleLocationError(true, infoWindow, map.getCenter());
         });
       } else {
         // Browser doesn't support Geolocation
         handleLocationError(false, infoWindow, map.getCenter());
       }

  var geocoder = new google.maps.Geocoder();
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

//((DESTIONATION
function calculateAndDisplayRoute(directionsDisplay, directionsService,
          markerArray, stepDisplay, map, service) {
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(null);
        }

        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: 'WALKING'
        }, function(response, status) {
          // Route the directions and pass the response to a function to create
          // markers for each step.
          if (status === 'OK') {

              var service = new google.maps.DistanceMatrixService;
              service.getDistanceMatrix({
                      origins: [document.getElementById('start').value],
                      destinations: [document.getElementById('end').value],
                      travelMode: 'DRIVING',
                    }, function(response, status) {
                      if (status !== 'OK') {
                        alert('Error was: ' + status);
                      } else {
                        console.log(response)
                        var originList = response.originAddresses;
                        var destinationList = response.destinationAddresses;
                        for(var i =0; i<originList.length; i++){
                          var results = response.rows[i].elements;
                          for(var j=0; j<results.length;j++){
                          var element = results[j];
                          var dt = element.distance.text;
                          document.getElementById('journey').value = dt;
                          };
                        };
                      }
                    });

            directionsDisplay.setDirections(response);
            showSteps(response, markerArray, stepDisplay, map);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
  var myRoute = directionResult.routes[0].legs[0];

}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}
//DESTIONATION))
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') { //indicates that no errors occurred; the address was successfully parsed and at least one geocode was returned.
      document.getElementById('longitude').value ="longitude: "+  results[0].geometry.location.lng();
      document.getElementById('latitude').value ="latitude: "+  results[0].geometry.location.lat();
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function distance(service,geocoder){

  service.getDistanceMatrix({
          origins: [document.getElementById('start').value],
          destinations: [document.getElementById('end').value],
          travelMode: 'DRIVING',
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            console.log(response)
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            for(var i =0; i<originList.length; i++){
              var results = response.rows[i].elements;
              for(var j=0; j<results.length;j++){
              var element = results[j];
              var dt = element.distance.text;
              document.getElementById('journey').value = dt;
              };
            };
          }
        });
}
