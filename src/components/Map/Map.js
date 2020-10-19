import React, { useState, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  withScriptjs,
  InfoWindow,
  withGoogleMap
} from 'react-google-maps';
import { CustomControl, SecoundCustom } from './components';
//import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

const Map = props => {
  const { markerLabel, onButtonClick } = props;
  const [selectedMarker, setMarkerState] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [currentMarkerLocation, setCurrentMarkerLocation] = useState(false);

  const mapRef = useRef();
  const openMarker = () => {
    setMarkerState(true);
  };
  const closeMarker = () => {
    setMarkerState(false);
  };
  const handelMarkDargEnded = cords => {
    const lat = cords.latLng.lat();
    const lng = cords.latLng.lng();
    setCurrentMarkerLocation({ lat, lng });
  };

  return (
    <GoogleMap
      ref={mapRef}
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      defaultOptions={{ mapTypeControl: false }}>
      <SecoundCustom position={window.google.maps.ControlPosition.RIGHT_BOTTOM}>
        <CustomControl onClick={onButtonClick} />
      </SecoundCustom>
      <Marker
        position={currentMarkerLocation || { lat: -34.397, lng: 150.644 }}
        onClick={() => openMarker()}
        draggable={true}
        onDragEnd={cords => handelMarkDargEnded(cords)}
      />
      {selectedMarker && (
        <InfoWindow
          onCloseClick={() => closeMarker()}
          labelAnchor={new window.google.maps.Point(10, 0)}
          position={currentMarkerLocation || { lat: -34.397, lng: 150.644 }}>
          <div>{markerLabel}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));
const APIKey = process.env.REACT_APP_MAP;
const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${APIKey}`;

const createMap = props => {
  const { markerLabel, onButtonClick, mapBorderRadius } = props;
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <WrappedMap
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={
          <div style={{ height: '100%', borderRadius: mapBorderRadius }} />
        }
        markerLabel={markerLabel}
        onButtonClick={onButtonClick}
      />
    </div>
  );
};

export default createMap;

/* { <MarkerWithLabel
        position={{ lat: -34.397, lng: 150.644 }}
        labelAnchor={new window.google.maps.Point(0, 0)}
        labelStyle={{ backgroundColor: "#2979ff", color: "#FFFFFF", fontSize: "15px", padding: "8px" }}
      >
        <div>{markerLabel}</div>
      </MarkerWithLabel> }
   )}*/
