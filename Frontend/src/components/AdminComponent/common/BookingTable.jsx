import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import "../../../components/AdminComponent/table/table.scss";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const BookingTable = ({ columns, rows, onView, onAccept, onReject }) => {
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle change of page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginated rows
  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );


  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#059212" }}>
            {/* Dynamically render the table headers */}
            {columns.map((column) => (
              <TableCell
                key={column.field}
                className="tableCell"
                style={{ color: "white" }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Dynamically render the table rows and cells */}
          {paginatedRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.field} className="tableCell">
                  {column.field === "action" ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      {/* View Action */}
                      <InfoOutlinedIcon
                        style={{
                          color: "green",
                          cursor: "pointer",
                        }}
                        onClick={() => onView(row)}
                      />

                      {/* Conditionally render Accept and Reject buttons only if status is "Approved" and the user is admin */}
                      {row.status === "Pending" && (
                        <>
                          {/* Accept Action */}
                          <button
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              border: "none",
                              padding: "5px 10px",
                              cursor: "pointer",
                              borderRadius: "5px",
                            }}
                            onClick={() => onAccept(row)}
                          >
                            Accept
                          </button>

                          {/* Reject Action */}
                          <button
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              border: "none",
                              padding: "5px 10px",
                              cursor: "pointer",
                              borderRadius: "5px",
                            }}
                            onClick={() => onReject(row)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  ) : column.field === "status" ? (
                    <span className={`status ${row[column.field]}`}>
                      {row[column.field]}
                    </span>
                  ) : (
                    row[column.field]
                  )}

                  {column.field === "sn" && <span>{rowIndex}</span>}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination component */}
      <TablePagination
        component="div"
        count={rows.length}
        page={page} // current page
        onPageChange={handleChangePage} // Page change handler
        rowsPerPage={rowsPerPage} // Rows per Page
        onRowsPerPageChange={handleChangeRowsPerPage} // Rows per page change handler
        labelRowsPerPage="Rows per page"
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
      />
    </TableContainer>
  );
};

export default BookingTable;
