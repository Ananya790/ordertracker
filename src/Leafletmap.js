import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Leaflet.css';

function Leafletmap() {
  const location = useLocation();
  const { source, destination, currentLocation } = location.state || {};

  if (!source || !destination || !currentLocation) {
    return <div>Error: Missing location data.</div>;
  }

  const customIcon = new Icon({
    iconUrl:"https://img.icons8.com/ios-filled/50/truck.png",
    iconSize:[35, 35]
  })

  const mark = new Icon({
    iconUrl:"https://img.icons8.com/ios-filled/50/map-pin.png",
    iconSize:[35, 35]
  })

  return (
    <>
     <div className='upper'>
      <p> <strong>Source:</strong> {source.name}</p>
      <p><strong> Destination:</strong> {destination.name}</p>
      <p> <strong>Current Location:</strong> {currentLocation.name}</p>
      <p><strong>Status:</strong> {currentLocation.status}</p>
      <p><strong>Delivery Date:</strong>{currentLocation.date}</p>
      </div> 
      <div className='leaflet-container'>
    <MapContainer center={[currentLocation.lat, currentLocation.long]} zoom={10} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[source.lat, source.long]}  icon ={mark}>
        <Popup>
        Source: {source.name}
        
        </Popup>
      </Marker>  
       <Marker position={[destination.lat, destination.long]}  icon ={mark}   >
        <Popup>
        Destination: {destination.name}
        </Popup>
      </Marker>
      <Marker position={[currentLocation.lat, currentLocation.long]}  icon = {customIcon}>
        <Popup>
        Current Location: {currentLocation.name}<br/>
        status: {currentLocation.status}<br/>
        Delivery Date:{currentLocation.date}<br/>
        </Popup>
      </Marker>
    </MapContainer></div></>
  );
}

export default Leafletmap;

























