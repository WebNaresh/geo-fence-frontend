import {
  DrawingManagerF,
  GoogleMap,
  LoadScript,
  MarkerF,
  PolygonF,
} from "@react-google-maps/api";
import React from "react";

const GeoMaps = ({ apiKey, center, path, polygonComplete }) => {
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
          center={center}
          zoom={12}
        >
          <MarkerF position={center} />
          {path.length === 0 || path.length === 1 || path.length === 2 ? (
            <DrawingManagerF
              drawingMode={"polygon"}
              onPolygonComplete={polygonComplete}
              options={{
                polygonOptions: {
                  fillColor: `#2198f3`,
                  strokeColor: "#2196f3",
                  fillOpacity: 0.5,
                  strokeWeight: 2,
                  clickable: true,
                  editable: true,
                  zIndex: 1,
                  draggable: true,
                },
              }}
              onLoad={(drawingManager) => {
                console.log(
                  `🚀 ~ file: GeoMaps.jsx:39 ~ drawingManager`,
                  drawingManager
                );
              }}
            />
          ) : (
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
              path={path}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GeoMaps;
