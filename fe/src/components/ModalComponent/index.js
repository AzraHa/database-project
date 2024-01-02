import React from "react";
import Modal from "@mui/material/Modal";

const ModalComponent = ({ isOpen, handleClose, data }) => {
  const renderDataItem = (label, value) => (
    <div style={{ textAlign: "right", margin: "8px 0" }}>
      <strong>{label}:</strong> {value}
    </div>
  );

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    backgroundColor: "white",
    padding: "16px",
    borderRadius: "8px"
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      {data && (
        <div style={modalStyle}>
          <h2 style={{ textAlign: "center" }}>Order Details</h2>
          {renderDataItem("Delivery Note ID", data.delivery_note_id)}
          {renderDataItem("Delivery Note Number", data.delivery_note_number)}
          {renderDataItem("Date of Delivery Note", data.date_of_delivery_note)}
          {renderDataItem("Customer Code", data.customer_code)}
          {renderDataItem("Address", data.address)}
          {renderDataItem("City", data.city)}
          {renderDataItem("Zip Code", data.zip_code)}
          {renderDataItem("Country", data.country)}
          {renderDataItem("Warehouse Name", data.warehouse_name)}
          {renderDataItem("Order Date", data.order_date)}
          {renderDataItem("Order Status", data.order_status)}
          {renderDataItem("Items", data.items)}
          {renderDataItem("Total Amount", data.total_amount)}
          {renderDataItem("Last Inspection Date", data.last_inspection_date)}
          {renderDataItem(
            "Last Inspection End Date",
            data.last_inspection_end_date
          )}
          {renderDataItem("Last Scanning Date", data.last_scanning_date)}
        </div>
      )}
    </Modal>
  );
};

export default ModalComponent;
