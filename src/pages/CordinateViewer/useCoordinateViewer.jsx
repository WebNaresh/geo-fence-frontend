import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const useCoordinateViewer = () => {
  const { coordinateId } = useParams();
  const getCoordinateInfo = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/coordinate-single/${coordinateId}`
    );
    return response?.data?.data;
  };

  const { data } = useQuery({
    queryKey: ["coordinate", coordinateId],
    queryFn: getCoordinateInfo,
    initialData: [],
  });

  return { data };
};

export default useCoordinateViewer;
