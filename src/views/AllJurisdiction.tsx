import React, { useEffect, useState } from "react";
import {
  Button,
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
import { API } from "../utils/api.config";

interface AllJurisdictionProps {
  setAlert: any;
  setView: (view: View, viewProps: any) => void;
}

const AllJurisdiction = ({ setAlert, setView }: AllJurisdictionProps) => {
  const [places, setplaces] = useState<Place[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getAllJusrisdictions();
  }, []);

  const getAllJusrisdictions = async () => {
    const { data }: any = await API.get("places");

    setplaces(data.places);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const copyText = (place: Place) => {
    setView("all", {
      jurisdictionId: place.id,
      fileName: `${place.title}_${place.type}.csv`,
    });

    setAlert({
      appear: true,
      message: "Please wait, downloading...",
    });
  };

  return (
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
                  <Button onClick={() => copyText(place)}>{place.id}</Button>
                </TableCell>
                <TableCell>{place.title}</TableCell>
                <TableCell>{place.type}</TableCell>
              </TableRow>
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
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
  );
};

export default AllJurisdiction;
