import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppFunction from "../../hooks/useAppFunction";

const useHomeQuery = () => {
  const [name, setName] = useState("");
  const { handleAlert } = useAppFunction();
  const navigate = useNavigate();
  const addName = async (data) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    await axios.post(`${serverUrl}/api/add-name`, data, config);
  };

  const { mutate } = useMutation({
    mutationFn: addName,
    onSuccess: (data) => {
      console.log(`🚀 ~ file: useHomeQuery.jsx:18 ~ data:`, data);
      console.log("success");
      handleAlert(true, "success", data?.message || "Name added successfully");
      setName("");
      navigate(`/map/${name}`);
    },
    onError: (data) => {
      console.log(`🚀 ~ file: useHomeQuery.jsx:21 ~ data:`, data);
      console.log("error");
      handleAlert(true, "error", data?.message || "Name not added");
    },
  });
  return { mutate, name, setName };
};

export default useHomeQuery;
