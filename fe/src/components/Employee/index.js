import { useState } from "react";
import { useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import { REACT_APP_BACKEND_URL } from "../../constants/appDefaults";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [addClicked, setAddClicked] = useState(false);

  const [employeeData, setEmployeeData] = useState({
    employee_name: "",
    employee_code: "",
    role: ""
  });

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}employees`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}employees/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );

      alert(`DELETE: Employee ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting employee:", error.message);
      alert("Failed to delete employee");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeData)
      });

      if (!response.ok) {
        alert(response);
        throw new Error("Failed to add employee", response);
      }

      setEmployeeData({
        employee_name: "",
        employee_code: "",
        role: ""
      });

      fetchEmployees();

      alert("Employee added successfully");
    } catch (error) {
      console.error("Error adding employee:", error.message);
      alert("Failed to add employee");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.employee_name}
                </TableCell>
                <TableCell align="right">{row.employee_code}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right" sx={{ display: "flex" }}>
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
      <Button
        variant="outlined"
        style={{
          backgroundColor: "green",
          color: "white"
        }}
      >
        <Box>
          <AddIcon onClick={() => setAddClicked(!addClicked)} />
        </Box>
      </Button>
      {addClicked ? (
        <div>
          <form onSubmit={handleFormSubmit}>
            <label style={{ display: "block", margin: "10px 0" }}>
              Name:
              <input
                type="text"
                name="employee_name"
                value={employeeData.employee_name}
                onChange={handleInputChange}
                style={{ marginLeft: "10px" }}
              />
            </label>
            <br />
            <label style={{ display: "block", margin: "10px 0" }}>
              Code:
              <input
                type="text"
                name="employee_code"
                value={employeeData.employee_code}
                onChange={handleInputChange}
                style={{ marginLeft: "10px" }}
              />
            </label>
            <br />
            <label style={{ display: "block", margin: "10px 0" }}>
              Role:
              <input
                type="text"
                name="role"
                value={employeeData.role}
                onChange={handleInputChange}
                style={{ marginLeft: "10px" }}
              />
            </label>
            <br />
            <Button type="submit" variant="outlined" color="primary">
              Add Employee
            </Button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
