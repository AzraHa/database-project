import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/Employee/index";
import HomePage from "./components/HomePageComponent";
import CleanDatabase from "./components/CleanDatabase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />{" "}
        <Route
          path={"/employees"}
          element={<EmployeeList route={"employees"} />}
        />
        <Route path={"/orders"} element={<EmployeeList route={"orders"} />} />
        <Route
          path={"/clean-database"}
          element={<CleanDatabase route={"clean-database"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
