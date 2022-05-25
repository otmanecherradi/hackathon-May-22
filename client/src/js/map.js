import 'mapbox-gl/dist/mapbox-gl.css';

import mbx from 'mapbox-gl';
import axios from 'axios';

import mbxClient from '@mapbox/mapbox-sdk';
import mbxDirections from '@mapbox/mapbox-sdk/services/directions';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const baseClient = mbxClient({
  accessToken: 'pk.eyJ1Ijoib3RtYW5lY2hlcnJhZGkiLCJhIjoiY2t0ZWpuam02MHp0eDJxcndjZHFuemM5byJ9.Ksc2Dfz-ElqZTrOteg4uwA',
});
const mbxDirectionService = mbxDirections(baseClient);
const mbxGeocodingService = mbxGeocoding(baseClient);

mbx.accessToken = 'pk.eyJ1Ijoib3RtYW5lY2hlcnJhZGkiLCJhIjoiY2t0ZWpuam02MHp0eDJxcndjZHFuemM5byJ9.Ksc2Dfz-ElqZTrOteg4uwA';

async function getLocationAddress(latLng) {
  const { body } = await mbxGeocodingService
    .reverseGeocode({
      query: latLng.toArray(),
      limit: 1,
    })
    .send();

  return body;
}

async function assignToInput(latLng, id) {
  const body = await getLocationAddress(latLng);

  const input = document.querySelector(`input#${id}`);
  input.value = body.features[0].place_name;
}

const routesElement = document.querySelector('div#routes');

const data = {
  departure: null,
  arrival: null,
};

const mapElement = document.querySelector('div#map');

const mbxMap = new mbx.Map({
  container: mapElement,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-5.79975, 35.76727],
  zoom: 13,
});

async function getRoutes(data) {
  const { body } = await mbxDirectionService
    .getDirections({
      profile: 'driving-traffic',
      steps: true,
      geometries: 'geojson',
      waypoints: [
        {
          coordinates: [data.departure.lat, data.departure.lng],
          approach: 'unrestricted',
        },
        {
          coordinates: [data.arrival.lat, data.arrival.lng],
          approach: 'unrestricted',
        },
      ],
    })
    .send();

  const routes = body.routes.sort((a, b) => a.distance > b.distance);

  routesElement.innerHTML = '';
  routes.forEach((route, idx) => {
    const div = document.createElement('div');

    div.classList.add(
      'h-full',
      'border-2',
      'border-opacity-60',
      'rounded-lg',
      'overflow-hidden',
      'border-l-8',
      idx === 0 ? 'border-green-500' : idx === 1 ? 'border-yellow-500' : 'border-red-500'
    );

    div.innerHTML = `
    <div class="p-6">
      <h1 class="title-font text-lg font-medium text-gray-900 mb-3">Best route</h1>
      <p class="leading-relaxed mb-3">
${(route.distance / 1000).toFixed(2)} km / ${(route.duration / 60).toFixed(2)} mins
    </p>
  </div>`;

    routesElement.append(div);

    const routeCoordinates = route.geometry.coordinates;

    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: routeCoordinates,
      },
    };

    if (mbxMap.getSource('route' + idx)) {
      mbxMap.getSource('route' + idx).setData(geojson);
    } else {
      mbxMap.addLayer({
        id: 'route' + idx,
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#888',
          'line-width': 8,
        },
      });
    }
    // we'll add turn instructions here at the end
  });
}

async function main() {
  mbxMap.on('click', (ev) => {
    if (data.departure && data.arrival) {
      return;
    } else if (!data.departure) {
      const marker = new mbx.Marker().setLngLat([ev.lngLat.lng, ev.lngLat.lat]).addTo(mbxMap);
      data.departure = marker.getLngLat();
      assignToInput(marker.getLngLat(), 'departure');
    } else if (!data.arrival) {
      const marker = new mbx.Marker().setLngLat([ev.lngLat.lng, ev.lngLat.lat]).addTo(mbxMap);
      data.arrival = marker.getLngLat();

      assignToInput(marker.getLngLat(), 'arrival');
    }
  });

  const formElement = document.querySelector('form');

  formElement.addEventListener('submit', (ev) => {
    ev.preventDefault();

    if (!data.departure && !data.arrival) {
      return;
    }
    getRoutes(data);
  });
}

main();
