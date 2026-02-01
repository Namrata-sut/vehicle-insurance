import React from "react";
import "./Dashboard.css";

const VehicleTable = ({ vehicles }) => {

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
          <th>Permit Expiry</th>
          <th>Permit Auth Date</th>
          <th>Fitness Expiry</th>
          <th>PUC Expiry</th>
          <th>CNG Leakage Test</th>
          <th>Tax Receipt Validity</th>
          <th>Road Tax / MV Tax</th>

          <th>Driver DL No</th>
          <th>Driver Name</th>
          <th>DL No</th>
          <th>DL Expiry</th>

          <th>Claim</th>
          <th>RC Valid Till</th>
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
            <td>{v.permit_expiry_date}</td>
            <td>{v.permit_authorization_date}</td>
            <td>{v.fitness_expiry_date}</td>
            <td>{v.puc_expiry_date}</td>
            <td>{v.cng_leakage_test}</td>
            <td>{v.tax_receipt_validity_date}</td>
            <td>{v.road_tax_mv_tax}</td>

            <td>{v.driver_dl_no}</td>
            <td>{v.driver_name}</td>
            <td>{v.dl_no}</td>
            <td>{v.dl_expiry_date}</td>

            <td>{v.claim}</td>
            <td>{v.rc_valid_till_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehicleTable;
