import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useHomeQuery = () => {
  const [name, setName] = useState("");
  const addName = async (data) => {
    const config = { headers: { "Content-Type": "application/json" } };
    await axios.post(process.env.VITE_SERVER_URL, data, config);
  };

  const { mutate } = useMutation({
    mutationFn: addName,
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });
  return { mutate, name, setName };
};

export default useHomeQuery;
