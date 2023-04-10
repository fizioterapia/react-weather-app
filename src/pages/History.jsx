import { forwardRef, useState } from "react";

import {
  Link as BreadcrumbLink,
  Breadcrumbs,
  IconButton,
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

import formatDate from "../utils/formatDate";

import { Link as RouterLink } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";

const Link = forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function IconButtonLink(props) {
  const { to } = props;

  return (
    <IconButton component={Link} to={to}>
      <PreviewIcon />
    </IconButton>
  );
}

function ClearHistoryButton(props) {
  const { onClick } = props;

  return (
    <Button
      variant="contained"
      startIcon={<DeleteIcon />}
      color="error"
      onClick={onClick}
      sx={{ marginBottom: 2, marginTop: 2 }}
    >
      Clear history
    </Button>
  );
}

export default function History() {
  const [history, setHistory] = useState(() => {
    const tempHistory = localStorage.getItem("WeatherHistory");

    if (tempHistory == null) {
      return [];
    }

    return JSON.parse(tempHistory);
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClearHistory = () => {
    localStorage.removeItem("WeatherHistory");
    setHistory([]);
  };

  return (
    <>
      <Breadcrumbs sx={{ marginBottom: 2 }}>
        <Typography variant="body1">App</Typography>
        <BreadcrumbLink color="inherit" component={RouterLink} to="/history">
          History
        </BreadcrumbLink>
      </Breadcrumbs>
      <TableContainer component={Paper}>
        <ClearHistoryButton onClick={handleClearHistory} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Place</TableCell>
              <TableCell align="center">Fetched</TableCell>
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((weather) => (
                <TableRow key={weather.id}>
                  <TableCell align="center">
                    <Typography variant="body1">{weather.data.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {formatDate(weather.created_at)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButtonLink to={`/history/${weather.id}`} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            {history.length === 0 || history == null ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No historical data available
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  count={history.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
