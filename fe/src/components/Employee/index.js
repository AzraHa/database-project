import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

const rows = [
  { id: 1, firstName: "hhr", lastName: "jrjr", code: "233", role: "!" },
  { id: 2, firstName: "rrr", lastName: "jrjr", code: "233", role: "!" },
  { id: 3, firstName: "hrhr", lastName: "jrjr", code: "233", role: "!" },
  { id: 4, firstName: "hhrrrr", lastName: "jrjr", code: "233", role: "!" },
  { id: 5, firstName: "hhrr", lastName: "jrjr", code: "233", role: "!" }
];

export default function Employee() {
  const handleEdit = (id) => {
    alert("EDIT");
  };

  const handleDelete = (id) => {
    alert("DELETE");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell align="right">Last name</TableCell>
            <TableCell align="right">Code</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.code}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right" sx={{ display: "flex" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(row.id)}
                >
                  <Box>
                    <EditIcon />
                  </Box>
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "red",
                    color: "white"
                  }}
                  onClick={() => handleDelete(row.id)}
                >
                  <Box>
                    <DeleteIcon />
                  </Box>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
