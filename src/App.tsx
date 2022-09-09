import { useState } from "react";
import { Paper, Snackbar, Typography } from "@mui/material";
import "./App.css";
import AllJurisdiction from "./views/AllJurisdiction";
import { API } from "./utils/api.config";
import { downloadBlob } from "./utils/methods";

function App() {
  const [view, setview] = useState<View>("all");
  const [alert, setAlert] = useState<{
    appear: boolean;
    message?: string;
    action?: any;
  }>({
    appear: false,
  });

  const setViewFunctionally = async (view: View, props: any) => {
    setview(view);

    const { jurisdictionId, fileName, onComplete } = props;

    try {
      const response = await API.get(`/place/${jurisdictionId}`);
      downloadBlob(response.data.csv, fileName, "text/csv;charset=utf-8;");
      setAlert({
        appear: true,
        message: "Download successfull",
      });
    } catch (error) {
      setAlert({
        appear: false,
      });
      setAlert({
        appear: true,
        message: "Some error occured",
      });
    }

    onComplete();
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
        <Typography className="page-title-text" variant="h5" component="h1">
          Available jurisdictions
        </Typography>
      </Paper>

      <div className="view-container">{getViewToRender()}</div>

      <Snackbar
        open={alert.appear}
        onClose={() => setAlert({ appear: false })}
        message={alert.message}
        action={alert.action}
      />
    </div>
  );
}

export default App;
