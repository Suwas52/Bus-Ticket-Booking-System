import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import Paper from "@mui/material/Paper";
import "../../components/AdminComponent/table/table.scss"

const DynamicTable = ({ columns, rows }) => {

    // Function to return the color for the action icon based on the action type
const getActionColor = (action) => {
    switch (action) {
      case 'edit':
        return 'blue'; // Change to your desired color for 'edit'
      case 'delete':
        return 'red'; // Change to your desired color for 'delete'
      case 'view':
        return 'green'; // Change to your desired color for 'view'
      default:
        return 'black'; // Default color
    }
  };
  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow style={{backgroundColor: "#059212"}}>
          {/* Dynamically render the table headers */}
          {columns.map((column) => (
            <TableCell key={column.field} className='tableCell' style={{color: "white"}}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {/* Dynamically render the table rows and cells */}
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={column.field} className='tableCell'>
                {/* handling for status field to apply css */}
                {
                    column.field === "action" ? (
                      <span
                        className={`action-icon ${row[column.field]}`}
                        style={{ color: getActionColor(row[column.field]) }} // Add dynamic color
                      >
                        {row[column.field]}
                      </span>
                    ) : column.field === "status" ? (
                      <span className={`status ${row[column.field]}`}>{row[column.field]}</span>
                    ) : (
                      row[column.field]
                    )
                  }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  );
};

export default DynamicTable;
