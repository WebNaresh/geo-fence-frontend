import React from "react";
import GeoMaps from "./components/geo-map";
import useCoordinateViewer from "./useCoordinateViewer";

const CoordinateViewer = () => {
  const { data } = useCoordinateViewer();

  return (
    <div className="flex">
      <div>
        {data?.coordinate?.length > 0 && (
          <GeoMaps
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            data={data}
          />
        )}
      </div>
      <div></div>
    </div>
  );
};

export default CoordinateViewer;
