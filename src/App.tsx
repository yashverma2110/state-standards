import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./App.css";
import { API } from "./utils/api.config";

function App() {
  useEffect(() => {
    getAllJusrisdictions();
  }, []);

  const getAllJusrisdictions = async () => {
    const data = await API.get("jurisdictions");

    console.log(data);
  };

  return (
    <div className="App">
      <Typography variant="h5" component="h1">
        Available jurisdictions
      </Typography>
    </div>
  );
}

export default App;
