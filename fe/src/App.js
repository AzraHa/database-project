import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/Employee/index";
import HomePage from "./components/HomePageComponent";
import CleanDatabase from "./components/CleanDatabase";
import Orders from "./components/Orders";
import CustomerOrders from "./components/CustomerOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />{" "}
        <Route
          path={"/employees"}
          element={<EmployeeList route={"employees"} />}
        />
        <Route path={"/orders"} element={<Orders route={"orders"} />} />
        <Route
          path={"/customer-orders"}
          element={<CustomerOrders route={"customer-orders"} />}
        />
        <Route
          path={"/clean-database"}
          element={<CleanDatabase route={"clean-database"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
