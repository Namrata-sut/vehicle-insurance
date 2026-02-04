import React from "react";
import "./Dashboard.css";

const ExpirySimpleTable = ({ vehicles }) => {

  if (!vehicles || vehicles.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <table className="vehicle-table">
      <thead>
        <tr>
          <th>SL No</th>
          <th>Name</th>
          <th>Reg No</th>
          <th>Policy No</th>
          <th>Insurance Expiry</th>
        </tr>
      </thead>

      <tbody>
        {vehicles.map((v) => (
          <tr key={v.id}>
            <td>{v.sl_no}</td>
            <td>{v.name}</td>
            <td>{v.reg_no}</td>
            <td>{v.policy_no}</td>
            <td>{v.insurance_expiry_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpirySimpleTable;
