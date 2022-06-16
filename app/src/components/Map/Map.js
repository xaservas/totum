import { Marker, Popup } from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './map.scss';

function Map() {
  return (
    <div className='Map'>
      <link
        rel='stylesheet'
        href='https://unpkg.com/leaflet@1.8.0/dist/leaflet.css'
        integrity='sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=='
        crossOrigin=''
      />
      <script
        src='https://unpkg.com/leaflet@1.8.0/dist/leaflet.js'
        integrity='sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=='
        crossOrigin=''
      />

      <MapContainer
        center={[42.6886591, 2.8948332]}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='OpenStreetMap'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* <Marker position={[42.6886591, 2.8948332]}>
          <Popup>
            <span>Totum #13</span>
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}

export default Map;
