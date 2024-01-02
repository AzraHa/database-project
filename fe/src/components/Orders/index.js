import { useState } from "react";
import { useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import ModalComponent from "../ModalComponent";

import { REACT_APP_BACKEND_URL } from "../../constants/appDefaults";
import { Button } from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [orderData, setOrderData] = useState({
    employee_name: "",
    employee_code: "",
    role: ""
  });

  const handleRowClick = (row) => {
    try {
      setSelectedRow(row);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching details:", error.message);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}orders`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        alert(response);
        throw new Error("Failed to add employee", response);
      }

      setOrderData(null);

      fetchOrders();

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
              <TableCell>delivery_note_id</TableCell>
              <TableCell>delivery_note_number</TableCell>
              <TableCell>date_of_delivery_note</TableCell>
              <TableCell>order_date</TableCell>
              <TableCell>order_status</TableCell>
              <TableCell>last_inspection_date</TableCell>
              <TableCell>last_inspection_end_date</TableCell>
              <TableCell>last_scanning_date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row.delivery_note_id}
                onClick={() => handleRowClick(row)}
              >
                <TableCell component="th" scope="row">
                  {row.delivery_note_id}
                </TableCell>
                <TableCell align="right">{row.delivery_note_number}</TableCell>
                <TableCell align="right">{row.date_of_delivery_note}</TableCell>
                <TableCell align="right">{row.order_date}</TableCell>
                <TableCell align="right">{row.order_status}</TableCell>
                <TableCell align="right">{row.last_inspection_date}</TableCell>
                <TableCell align="right">
                  {row.last_inspection_end_date}
                </TableCell>
                <TableCell align="right">{row.last_scanning_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedRow ? (
        <ModalComponent
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          data={selectedRow}
        />
      ) : (
        ""
      )}

      <Button onClick={() => setAddClicked(!addClicked)}>Create order</Button>

      {addClicked ? (
        <div>
          <form onSubmit={handleFormSubmit}>
            <label style={{ display: "block", margin: "10px 0" }}>
              Name:
              <input
                type="text"
                name="employee_name"
                value={orderData.employee_name}
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
                value={orderData.employee_code}
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
                value={orderData.role}
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
};

export default Orders;
