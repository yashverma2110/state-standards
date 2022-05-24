import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  debounce,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoadingIcon from "@mui/icons-material/Cached";
import { API } from "../utils/api.config";

interface AllJurisdictionProps {
  setAlert: any;
  setView: (view: View, viewProps: any) => void;
}

const AllJurisdiction = ({ setAlert, setView }: AllJurisdictionProps) => {
  const [allData, setAllData] = useState<Place[]>([]);
  const [places, setplaces] = useState<Place[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [processing, setprocessing] = useState(false);
  const [typeFilter, setTypeFilter] = useState<Type>("all");

  useEffect(() => {
    getAllJusrisdictions();
  }, []);

  const getAllJusrisdictions = async () => {
    const { data }: any = await API.get("places?src=places");

    setplaces(data.places);
    setAllData(data.places);
    setLoading(false);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const copyText = (place: Place) => {
    setprocessing(true);
    setView("all", {
      jurisdictionId: place.id,
      fileName: `${place.title}_${place.type}.csv`,
      onComplete: () => setprocessing(false),
    });

    setAlert({
      appear: true,
      message: "Please wait, processing...",
    });
  };

  const handleSearch = (e: any) => {
    if (e.target.value.trim() === "") {
      setplaces(allData);
      return;
    }

    const placesToSearch = places.filter((place) => {
      return (
        place.title.toLowerCase().indexOf(e.target.value?.toLowerCase()) > -1
      );
    });

    setplaces(placesToSearch);
  };

  const setFilter = (filter: Type) => {
    setTypeFilter(filter);
    setplaces(allData);
    if (filter === "all") {
      return;
    }

    const placesToSearch = allData.filter((place) => {
      return place.type === filter;
    });

    setplaces(placesToSearch);
  };

  return (
    <div>
      <Paper className="input-container">
        <Input
          className="input"
          type="text"
          placeholder="Search titles.."
          onChange={debounce(handleSearch, 500)}
          endAdornment={<SearchIcon />}
        />

        <div className="button-group-container">
          <Typography variant="h6">Type:</Typography>
          <ButtonGroup className="button-group">
            <Button
              variant={typeFilter === "all" ? "contained" : "outlined"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={typeFilter === "state" ? "contained" : "outlined"}
              onClick={() => setFilter("state")}
            >
              State
            </Button>
            <Button
              variant={typeFilter === "school" ? "contained" : "outlined"}
              onClick={() => setFilter("school")}
            >
              School
            </Button>
            <Button
              variant={typeFilter === "organization" ? "contained" : "outlined"}
              onClick={() => setFilter("organization")}
            >
              Org
            </Button>
          </ButtonGroup>
        </div>
      </Paper>

      <Alert
        style={{ margin: "16px 0" }}
        severity={processing ? "warning" : "info"}
      >
        {processing
          ? "It may take some time, please keep the tab open, you can navigate away"
          : "Click on the Id to begin download"}
      </Alert>

      {loading ? (
        <Paper elevation={4} className="loading">
          <LoadingIcon className="loading-icon" fontSize="large" />
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={4}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell>
                  <Typography className="thead" variant="h6">
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className="thead" variant="h6">
                    Title
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className="thead" variant="h6">
                    Type
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {places
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((place) => (
                  <TableRow
                    key={place.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Button onClick={() => copyText(place)}>
                        {place.id}
                      </Button>
                    </TableCell>
                    <TableCell>{place.title}</TableCell>
                    <TableCell>{place.type}</TableCell>
                  </TableRow>
                ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell>
                  {places.length === 0 ? (
                    <Typography variant="h6">No data found</Typography>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={places.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AllJurisdiction;
