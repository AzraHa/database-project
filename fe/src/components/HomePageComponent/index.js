import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const goToEmployees = () => {
    navigate("/employees");
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  const goToCustomerOrders = () => {
    navigate("/customer-orders");
  };

  const createOrder = () => {
    navigate("/create-order");
  };

  const cleanDatabase = () => {
    navigate("clean-database");
  };

  return (
    <div>
      <h2>HomePage</h2>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => goToEmployees()}
      >
        Employees
      </Button>
      <Button variant="outlined" color="primary" onClick={() => goToOrders()}>
        Orders
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => goToCustomerOrders()}
      >
        Customer orders
      </Button>
      <Button variant="outlined" color="primary" onClick={() => createOrder()}>
        Create order
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => cleanDatabase()}
      >
        Clean the database
      </Button>
    </div>
  );
};

export default HomePage;
