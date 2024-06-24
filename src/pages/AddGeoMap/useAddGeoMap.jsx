import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

const useAddGeoMap = () => {
  const { name } = useParams();
  const [path, setPath] = useState([]);
  const polygonComplete = useCallback((poly) => {
    const polyArray = poly.getPath().getArray();
    let paths = [];
    polyArray.forEach((coordinate) => {
      paths.push({ lat: coordinate?.lat(), lng: coordinate?.lng() });
    });
    setPath(paths);
    poly.setMap(null);
  }, []);

  const getMapInfo = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/map-info/${name}`
    );
    return response.data;
  };
  const { data: mapInfo } = useQuery({
    queryKey: ["map-info", name],
    queryFn: getMapInfo,
    initialData: [],
  });
  const getGeoCode = async () => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`
    );
    return response.data.results[0].geometry.location;
  };
  const { data } = useQuery({ queryKey: ["map", name], queryFn: getGeoCode });
  return {
    data,
    mapInfo,
    path,
    polygonComplete,
  };
};

export default useAddGeoMap;
