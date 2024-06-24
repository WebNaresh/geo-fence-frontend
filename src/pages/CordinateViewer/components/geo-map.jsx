import {
  CircleF,
  GoogleMap,
  LoadScript,
  MarkerF,
  PolygonF,
} from "@react-google-maps/api";
import React from "react";

const GeoMaps = ({ apiKey, data }) => {
  console.log(`🚀 ~ file: geo-map.jsx:10 ~ data:`, data);

  return (
    <div>
      GeoMaps
      <LoadScript
        googleMapsApiKey={apiKey}
        libraries={["drawing"]}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="w-[500px] h-[500px]"
          center={{
            lat: data?.coordinate[0]?.lat,
            lng: data?.coordinate[0]?.lng,
          }}
          zoom={12}
        >
          <MarkerF
            position={{
              lng: data?.coordinate[0]?.lng,
              lat: data?.coordinate[0]?.lat,
            }}
          />

          <PolygonF
            editable={true}
            options={{
              fillColor: `#2198f3`,
              strokeColor: "#2196f3",
              fillOpacity: 0.5,
              strokeWeight: 2,
            }}
            onLoad={(polygon) => {
              console.log(`🚀 ~ file: GeoMaps.jsx:55 ~ polygon`, polygon);
            }}
            path={data?.coordinate}
          />
          <CircleF
            center={{
              lat: data?.coordinate[0]?.lat,
              lng: data?.coordinate[0]?.lng,
            }}
            radius={1000}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GeoMaps;
