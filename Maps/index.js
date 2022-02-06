const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoicnl1azA3MDgiLCJhIjoiY2t6YjhrMmRpMGo4MDJwczY3c3hqdGF2MCJ9.hhzNKAv1EYcYkHYgZSkyXQ"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
})

function setupMap(centerPosition) {
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: centerPosition,
    zoom: 10,
    attributionControl: false,
  })

  const navigationControls = new mapboxgl.NavigationControl()
  const attributionControl = new mapboxgl.AttributionControl({
    customAttribution: "Map design by Sarthak",
  })
  const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  })
  const directionControls = new MapboxDirections({
    accessToken: MAPBOX_ACCESS_TOKEN,
  })
  map.addControl(navigationControls, "top-right")
  map.addControl(attributionControl)
  map.addControl(geolocateControl)
  map.addControl(directionControls, "top-left")

  const marker = new mapboxgl.Marker().setLngLat(centerPosition).addTo(map)

  const scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: "imperial",
  })
  map.addControl(scale)

  scale.setUnit("metric")
}

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}
