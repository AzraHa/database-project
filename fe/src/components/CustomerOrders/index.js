import { useState } from "react";
import { REACT_APP_BACKEND_URL } from "../../constants/appDefaults";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CustomerOrders = () => {
  const [formData, setFormData] = useState(null);

  const [orders, setOrders] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}orders/${formData.customerId}/${formData.dateFrom}/${formData.dateTo}`
      );

      if (!response.ok) {
        throw new Error("Failed to get orders", response);
      }

      const data = await response.json();

      const groupedOrders = data.reduce((acc, order) => {
        const existingOrder = acc.find(
          (groupedOrder) => groupedOrder.order_id === order.order_id
        );

        if (existingOrder) {
          existingOrder.items.push({
            id: order.id,
            item_name: order.item_name,
            item_code: order.item_code,
            tax_rate: order.tax_rate,
            unit_of_measure: order.unit_of_measure,
            amount: order.total_amount,
            total_price: order.total_price,
            total_order_price: order.total_order_price
          });
        } else {
          acc.push({
            customer_code: order.customer_code,
            customer_name: order.customer_name,
            address: order.address,
            zip_code: order.zip_code,
            city: order.city,
            country: order.country,
            order_id: order.order_id,
            order_date: order.order_date,
            status: order.status,
            total_order_price: order.total_order_price,
            items: [
              {
                id: order.id,
                item_name: order.item_name,
                item_code: order.item_code,
                tax_rate: order.tax_rate,
                unit_of_measure: order.unit_of_measure,
                amount: order.total_amount,
                total_price: order.total_price
              }
            ]
          });
        }

        return acc;
      }, []);

      setOrders(groupedOrders);
    } catch (error) {
      console.error("Error getting orders:", error.message);
      alert("Failed to get orders");
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label style={{ display: "block", margin: "10px 0" }}>
          Customer id:
          <input
            type="number"
            name="customerId"
            value={formData?.fromDate}
            onChange={handleInputChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label style={{ display: "block", margin: "10px 0" }}>
          Date from:
          <input
            type="date"
            name="dateFrom"
            value={formData?.dateFrom}
            onChange={handleInputChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label style={{ display: "block", margin: "10px 0" }}>
          Date to:
          <input
            type="date"
            name="dateTo"
            value={formData?.dateTo}
            onChange={handleInputChange}
            style={{ marginLeft: "10px" }}
          />
        </label>

        <br />
        <Button type="submit" variant="outlined" color="primary">
          Execute
        </Button>
      </form>
      {orders ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Code</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Customer Address</TableCell>
                <TableCell>Customer City</TableCell>

                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Item Details</TableCell>
                <TableCell>Order Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.customer_code}>
                  <TableCell>{order.customer_code}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.city}</TableCell>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.order_date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>
                          Name: {item.item_name} - Amount: {item.amount} - Tax
                          Rate: {item.tax_rate} - Price: {item.total_price}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{order.total_order_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomerOrders;
