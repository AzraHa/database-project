import React, { useState } from "react";
import { REACT_APP_BACKEND_URL } from "../../constants/appDefaults";

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    customerID: "",
    year: "",
    warehouseId: "",
    deliveryNoteNumber: "",
    itemsData: []
  });

  const [fields, setFields] = useState([{ product_code_id: "", amount: "" }]);

  const addField = () => {
    setFields([...fields, { product_code_id: "", amount: "" }]);
  };

  const handleFieldChange = (index, fieldName, value) => {
    setFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index][fieldName] = value;

      setFormData((prevFormData) => ({
        ...prevFormData,
        itemsData: newFields.map(({ product_code_id, amount }) => ({
          product_code_id,
          amount
        }))
      }));

      return newFields;
    });
  };

  const createOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerID: formData.customerID,
          year: formData.year,
          warehouseId: formData.warehouseId,
          deliveryNoteNumber: formData.deliveryNoteNumber,
          itemsData: JSON.stringify(formData.itemsData)
        })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={createOrder}>
      <label style={{ display: "block", margin: "10px 0" }}>
        Customer ID:
        <input
          type="number"
          name="customerID"
          value={formData.customerID}
          onChange={handleInputChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <br />
      <label style={{ display: "block", margin: "10px 0" }}>
        Year:
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <br />
      <label style={{ display: "block", margin: "10px 0" }}>
        Warehouse ID:
        <input
          type="number"
          name="warehouseId"
          value={formData.warehouseId}
          onChange={handleInputChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <br />
      <label style={{ display: "block", margin: "10px 0" }}>
        Delivery note number :
        <input
          type="text"
          name="deliveryNoteNumber"
          value={formData.deliveryNoteNumber}
          onChange={handleInputChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <br />
      <div>
        {fields.map((field, index) => (
          <div key={index}>
            <label>
              Product Code ID:
              <input
                type="text"
                value={field.product_code_id}
                onChange={(e) =>
                  handleFieldChange(index, "product_code_id", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Amount:
              <input
                type="text"
                value={field.amount}
                onChange={(e) =>
                  handleFieldChange(index, "amount", e.target.value)
                }
              />
            </label>
            <hr />
          </div>
        ))}
        <button type="button" onClick={addField}>
          Add More Fields
        </button>
      </div>
      <br />
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default CreateOrder;
