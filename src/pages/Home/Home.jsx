import { Button, TextField } from "@mui/material";
import React from "react";
import useHomeQuery from "./useHomeQuery";

const Home = () => {
  const { mutate, name, setName } = useHomeQuery();
  return (
    <div>
      <div className="m-20"></div>
      <TextField
        type="text"
        placeholder="Search..."
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Button variant="contained" onClick={() => mutate({ name })}>
        Add Name
      </Button>
    </div>
  );
};

export default Home;
