import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAppFunction from "../../hooks/useAppFunction";

const useAddGeoMap = () => {
  const { name } = useParams();
  const [path, setPath] = useState([]);
  const { handleAlert } = useAppFunction();
  const navigate = useNavigate();
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

  const savePolygonToDB = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    await axios.post(
      `${serverUrl}/api/coordinate/${mapInfo?.mapInfo?._id}`,
      { coordinates: path },
      config
    );
  };

  const { mutate } = useMutation({
    mutationFn: savePolygonToDB,
    onSuccess: (data) => {
      handleAlert(
        true,
        "success",
        data?.message || "Polygon added successfully"
      );
      setPath([]);
    },
    onError: (data) => {
      handleAlert(true, "error", data?.message || "Polygon not added");
    },
  });

  const getAllCoordinatesOfParent = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/coordinate/${
        mapInfo?.mapInfo?._id
      }`
    );
    return response.data?.data;
  };

  const { data: allCoordinates } = useQuery({
    queryKey: ["all-coordinates", mapInfo?.mapInfo?._id],
    queryFn: getAllCoordinatesOfParent,
    initialData: [],
    enabled: !!mapInfo?.mapInfo?._id,
  });

  return {
    data,
    mapInfo,
    path,
    polygonComplete,
    mutate,
    allCoordinates,
    navigate,
  };
};

export default useAddGeoMap;
