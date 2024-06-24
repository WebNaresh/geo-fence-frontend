import { Button, TextField } from "@mui/material";
import React from "react";
import useHomeQuery from "./useHomeQuery";

const Home = () => {
  const { mutate, name, setName } = useHomeQuery();
  const onSubmit = (e) => {
    e.preventDefault();
    mutate({ name });
  };
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="m-20 flex flex-col gap-4 border-2 p-8 shadow-lg"
      >
        <TextField
          type="text"
          placeholder="Search..."
          onChange={(e) => setName(e.target.value)}
          name="place"
          value={name}
          size="small"
        />
        <Button
          size="medium"
          variant="contained"
          onClick={() => mutate({ name })}
          disabled={name?.length < 2}
        >
          Add Name
        </Button>
      </form>
    </div>
  );
};

export default Home;
