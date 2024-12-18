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
import "../../components/AdminComponent/table/table.scss";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const CommonTable = ({ columns, rows, onView, onEdit, onDelete, }) => {
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

  const editpart = (iddata) => {
    alert(iddata);
  };

  // Function to return the color for the action icon based on the action type
  const getActionColor = (action) => {
    switch (action) {
      case "edit":
        return "blue"; // Change to your desired color for 'edit'
      case "delete":
        return "red"; // Change to your desired color for 'delete'
      case "view":
        return "green"; // Change to your desired color for 'view'
      default:
        return "black"; // Default color
    }
  };

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
                          color: getActionColor("view"),
                          cursor: "pointer",
                        }}
                        onClick={() => onView(row)}
                      />
                      {/* Edit Action */}
                      <EditOutlinedIcon
                        style={{
                          color: getActionColor("edit"),
                          cursor: "pointer",
                        }}
                        onClick={() => onEdit(row)}
                      />
                      {/* Delete Action */}
                      <DeleteOutlinedIcon
                        style={{
                          color: getActionColor("delete"),
                          cursor: "pointer",
                        }}
                        onClick={() => onDelete(row)}
                      />
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

export default CommonTable;
