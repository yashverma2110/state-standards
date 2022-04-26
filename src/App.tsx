import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import "./App.css";
import AllJurisdiction from "./views/AllJurisdiction";

function App() {
  const [view, setview] = useState<View>("all");
  const [viewProps, setviewProps] = useState<any>();
  const [alert, setAlert] = useState<{ appear: boolean; message?: string }>({
    appear: false,
  });

  const setViewFunctionally = (view: View, props: any) => {
    setview(view);
    setviewProps(props);
  };

  const getViewToRender = () => {
    switch (view) {
      case "all":
        return (
          <AllJurisdiction setView={setViewFunctionally} setAlert={setAlert} />
        );
      default:
        return <div>In Progress</div>;
    }
  };

  return (
    <div className="App">
      <Paper className="page-title" elevation={2}>
        <Typography variant="h5" component="h1">
          Available jurisdictions
        </Typography>
      </Paper>

      <ButtonGroup>
        <Button
          variant={view === "all" ? "contained" : "outlined"}
          onClick={() => setview("all")}
        >
          All jurisdiction
        </Button>
        <Button
          variant={view === "single" ? "contained" : "outlined"}
          onClick={() => setview("single")}
        >
          Specific jurisdiction
        </Button>
      </ButtonGroup>

      <div className="view-container">{getViewToRender()}</div>

      <Snackbar
        open={alert.appear}
        autoHideDuration={3000}
        onClose={() => setAlert({ appear: false })}
        message={alert.message}
      />
    </div>
  );
}

export default App;
