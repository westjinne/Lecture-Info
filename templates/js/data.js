// hardcoded data
var locationList = [
  {
    title: 'GyeongBokGung Palace',
    location: {lat: 37.579617, lng: 126.977041},
    fourID: '4b68220ef964a52087682be3'
  },{
    title: 'ChangGyeongGung Palace',
    location: {lat: 37.5802443, lng: 126.9946543},
    fourID: '5a26351f178a2a17a8f92f3f'
  },{
    title: 'ChangDeokGung Palace and Huwon',
    location: {lat: 37.5791505, lng: 126.9909628},
    fourID: '4b6dacd9f964a52051852ce3'
  },{
    title: 'DeokSuGung Palace',
    location: {lat: 37.5649333, lng: 126.976676},
    fourID: '4b27480ef964a5209d8524e3'
  },{
    title: 'JongMyo',
    location: {lat: 37.574583, lng: 126.994143},
    fourID: '5352319d498e79f7447fbed1'
  },{
    title: 'GwangHwaMun Square',
    location: {lat: 37.5722389, lng: 126.9769386},
    fourID: '4c00991f8c1076b0957b2071'
  }
];

// data of google Map styles 
var styles = [
  {
    featureType: 'water',
    stylers: [
      { color: '#96b7f2' }
    ]
  },{
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [
      { color: '#ffffff' },
      { weight: 6 }
    ]
  },{
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      { color: '#3c75d8' }
    ]
  },{
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      { color: '#fff9c4' },
      { lightness: -40 }
    ]
  },{
    featureType: 'transit.station',
    stylers: [
      { weight: 9 },
      { hue: '#f2372e' }
    ]
  },{
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [

      { visibility: 'off' }
    ]
  },{
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      { lightness: 100 }
    ]
  },{
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      { lightness: -100 }
    ]
  },{
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      { visibility: 'on' },
      { color: '#f0e4d3' }
    ]
  },{
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      { color: '#efe9e4' },
      { lightness: -25 }
    ]
  }
];
