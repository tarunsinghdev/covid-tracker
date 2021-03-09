import cuid from 'cuid';
import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './Map.css';
import { showDataOnMap } from './util';

function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Map = ({ countries, casesType, center, zoom }) => {
  console.log('coutries are', countries);
  console.log('center is', center);
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <ChangeMap center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
};

export default Map;
