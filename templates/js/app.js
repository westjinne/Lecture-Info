var map;
var infoWindow;
var windowContent;
var marker;

// google maps init
function initMap() {
//Set center, zoom and style
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.566535, lng: 126.9779692},
    zoom: 14,
    styles: styles,
    mapTypeControl: false
  });

    infoWindow = new google.maps.InfoWindow();

    //console.log(new ViewModel());
    ko.applyBindings(new ViewModel());
    // ko.applyBindings({locationList00 : [
    //   {
    //     title00: 'GyeonBokGung Palace',
    //     location: {lat: 37.579617, lng: 126.977041},
    //     fourID: '4b68220ef964a52087682be3'
    //   }
    // ]});

} //end of initMap

var LocationMarker = function(data) {
    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('f9b1d2');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('f20772');

    var clientID = 'IEFTGLJWGSSXVXUOTNQS2IR5MZQH3JH0GBXCWSKNEBXHCMLJ';
    var clientSecret = 'LNGMY5D55PNKNSXBQFCGOFT31AO4KYIEACZRLO1QD2S123RB';

    var self = this;
    this.title = data.title;
    this.position = data.location;
    this.street = '',
    this.city = '';
    this.visible = ko.observable(true);
    // JSON request of foursquare data
    var fourURL = 'https://api.foursquare.com/v2/venues/search?ll=' + this.position.lat + ',' + this.position.lng + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20160118' + '&query=' + this.title;

    $.getJSON(fourURL).done(function(data) {
		var results = data.response.venues[0];
        self.street = results.location.formattedAddress[0] ? results.location.formattedAddress[0]: 'N/A';
        self.city = results.location.formattedAddress[1] ? results.location.formattedAddress[1]: 'N/A';
    }).fail(function() {
        alert('Error on Foursquare!');
    });

    // Create marker
    this.marker = new google.maps.Marker({
        position: this.position,
        title: this.title,
        icon: defaultIcon
    });

    self.filterMarkers = ko.computed(function () {
        // set marker
        if(self.visible() === true) {
            self.marker.setMap(map);
        } else {
            self.marker.setMap(null);
        }
    });

//    console.log(showInfoWindow);

    // create click listener!!!!
    this.show = function(location) {
      google.maps.event.trigger(self.marker, 'click');
    };

    // Create an onclick even to open an indowindow at each marker
    this.marker.addListener('click', function() {
        showInfoWindow(this, self.street, self.city, infoWindow);
        map.panTo(this.getPosition());
    });

    // Event listener: change marker's color
    this.marker.addListener('click', function() {
        this.setIcon(highlightedIcon);
    });

    this.marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
    });

    this.marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
    });
};


function showInfoWindow(marker, street, city, iWindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (iWindow.marker != marker) {
        iWindow.marker = marker;
        iWindow.setContent('');

        // Make sure the marker property is cleared if the infowindow is closed.
        iWindow.addListener('closeclick', function() {
            iWindow.marker = null;
        });

        // Not going to use Google Street view, try to find solution

        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;

        windowContent = '<b><font color="#3c75d8" size = "3px">' + marker.title + '</font></b>' + '<hr>' + '<p>' + street + '<br>' + city + '<br>' + '</p>';

//        infoWindow.setContent(windowContent);

        var getLocalWindow = function (data) {
          iWindow.setContent(windowContent);
        };

        //set information window with content
        iWindow.setContent(windowContent);

        // open marker with information at correct place
        iWindow.open(map, marker);
    }
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
// Reference course's marker code
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}

// Set View Model
var ViewModel = function() {
    var self = this;
//    this.searchItem = ko.observable('');
    this.markerList = ko.observableArray([]);

    self.locationList = ko.observableArray(locationList);
    // add location markers for each location
    locationList.forEach(function(location) {
        self.markerList.push(new LocationMarker(location));
    });

    self.palaceList = ko.observableArray([]);
    self.query = ko.observable('');
    self.queryResult = ko.observable('');

    // locationList viewed on map
    console.log(locationList);
    this.locationList = ko.computed(function() {
        self.markerList().forEach(function(location) {
            location.visible(true);
        });
        return self.markerList();
    }, self);
};

// error handling
function googleMapsErrorHandling() {
    alert('Error on Google Maps!');
}
