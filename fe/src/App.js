import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/Employee/index";
import HomePage from "./components/HomePageComponent";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
