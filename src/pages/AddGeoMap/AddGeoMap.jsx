import { Button } from "@mui/material";
import React from "react";
import GeoMaps from "./components/GeoMaps";
import useAddGeoMap from "./useAddGeoMap";

const AddGeoMap = () => {
  const { data, path, polygonComplete } = useAddGeoMap();

  return (
    <div>
      <GeoMaps
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        center={data}
        path={path}
        polygonComplete={polygonComplete}
      />

      {path && path.length > 1 && <Button variant="contained">Save</Button>}
    </div>
  );
};

export default AddGeoMap;
