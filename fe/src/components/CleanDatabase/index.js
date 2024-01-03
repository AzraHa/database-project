import { useState } from "react";
import Button from "@mui/material/Button";
import { REACT_APP_BACKEND_URL } from "../../constants/appDefaults";

const CleanDatabase = () => {
  const [formData, setFormData] = useState(null);

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
      const response = await fetch(`${REACT_APP_BACKEND_URL}reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        alert("RESPONSE: ", response);
        throw new Error("Failed call SP");
      }

      setFormData({
        fromDate: "",
        toDate: ""
      });

      alert("RESPONSE: ", response);
    } catch (error) {
      console.error("Error calling SP", error.message);
      alert("Failed call SP");
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label style={{ display: "block", margin: "10px 0" }}>
          Date from:
          <input
            type="date"
            name="fromDate"
            value={formData?.fromDate}
            onChange={handleInputChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label style={{ display: "block", margin: "10px 0" }}>
          Date to:
          <input
            type="date"
            name="toDate"
            value={formData?.toDate}
            onChange={handleInputChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <br />
        <Button type="submit" variant="outlined" color="primary">
          Execute
        </Button>
      </form>
    </>
  );
};

export default CleanDatabase;
