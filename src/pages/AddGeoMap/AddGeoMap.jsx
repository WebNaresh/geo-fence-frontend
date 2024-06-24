import { Button } from "@mui/material";
import React from "react";
import GeoMaps from "./components/GeoMaps";
import useAddGeoMap from "./useAddGeoMap";

const AddGeoMap = () => {
  const {
    data,
    path,
    polygonComplete,
    mutate,
    allCoordinates,
    navigate,
    mapInfo,
  } = useAddGeoMap();
  console.log(`🚀 ~ file: AddGeoMap.jsx:16 ~ mapInfo:`, mapInfo);

  return (
    <div className="flex">
      <div>
        <GeoMaps
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          center={data}
          path={path}
          polygonComplete={polygonComplete}
        />

        {path && path.length > 1 && (
          <Button variant="contained" onClick={mutate}>
            Save
          </Button>
        )}
      </div>
      <div>
        <h1>Coordinates</h1>
        <ul className="flex flex-col gap-4 m-4">
          {allCoordinates?.map((coordinate) => (
            <Button
              className="p-2 cursor-pointer"
              key={coordinate._id}
              onClick={() => {
                navigate(`/map/${mapInfo?.mapInfo?.name}/${coordinate._id}`);
              }}
            >
              {coordinate._id}
            </Button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddGeoMap;
