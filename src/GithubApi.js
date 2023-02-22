import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import Chip from "@mui/material/Chip";

import { loadUsers } from "./redux/actions";
import {
  Avatar,
  Badge,
  CircularProgress,
  Link,
  TableHead,
  TextField,
} from "@mui/material";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function GithubApi() {
  const { users } = useSelector((state) => state.data);
  const loading = useSelector((state) => state.loading);

  const Data = users;
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchText, setSearchText] = React.useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = Data?.filter((item) => {
    return item.login.toLowerCase().includes(searchText.toLowerCase());
  });
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Data?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <TextField
          sx={{ mt: 2 }}
          size="small"
          placeholder="Search Name here..."
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
        />
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
        <TableContainer component={Paper} sx={{ maxHeight: 530 }}>
          {loading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <Box sx={{ p: 3 }}>
              <Table
                stickyHeader
                sx={{ minWidth: 450 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {["Id", "Name", "Repo Link", "url", "Score", "Type"].map(
                      (d) => (
                        <TableCell align="center" key={d}>
                          {d}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredData?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredData
                  ).map((git) => (
                    <TableRow key={git.id}>
                      <TableCell component="th" scope="row">
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <Avatar alt="" src={git.avatar_url} />
                        </StyledBadge>
                      </TableCell>
                      <TableCell align="right">{git.id}</TableCell>
                      <TableCell align="right">{git.login}</TableCell>

                      <TableCell align="right">
                        <Link
                          href={git.html_url}
                          underline="hover"
                          target="_blank"
                        >
                          {git.html_url}{" "}
                        </Link>
                      </TableCell>

                      <TableCell align="right">
                        <Link href={git.repos_url} underline="hover">
                          {git.repos_url}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Chip label={git.score} />
                      </TableCell>
                      <TableCell>{git.type} </TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={Data?.length}
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
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Box>
          )}
        </TableContainer>
      </Paper>
    </>
  );
}
