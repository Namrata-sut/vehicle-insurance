import React from "react";
import "./Dashboard.css";

const VehicleTable = ({ vehicles }) => {

  if (!vehicles || vehicles.length === 0) {
    return <p>No data available</p>;
  }

  // ================= DATE HIGHLIGHT LOGIC =================
  const getDateClass = (date) => {
    if (!date) return "";

    const today = new Date();
    const d = new Date(date);

    const diff = (d - today) / (1000 * 60 * 60 * 24);

    if (d < today) return "expired";   // 🔴
    if (diff <= 7) return "seven";     // 🟡
    if (diff <= 30) return "thirty";   // 🟠
    return "valid";                    // 🟢
  };

  // 👉 NEW: Check if this date is part of VALID DOCS API
  const isValidDocScreen = (vehicle, field) => {
    if (!vehicle.valid_documents) return false;

    return Object.keys(vehicle.valid_documents).includes(field);
  };

  const td = (vehicle, field, value) => {
    let className = "";

    // 👉 If from ALL OK screen → highlight only valid docs
    if (isValidDocScreen(vehicle, field)) {
      className = "valid";
    } else {
      className = getDateClass(value);
    }

    return <td className={className}>{value}</td>;
  };

  // ========================================================

  return (
    <table className="vehicle-table">
      <thead>
        <tr>
          <th>SL No</th>
          <th>Name</th>
          <th>Company Name</th>
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
            <td>{v.company_name}</td>
            <td>{v.reg_no}</td>
            <td>{v.policy_no}</td>

            {td(v, "insurance_expiry_date", v.insurance_expiry_date)}
            {td(v, "permit_expiry_date", v.permit_expiry_date)}
            {td(v, "permit_authorization_date", v.permit_authorization_date)}
            {td(v, "fitness_expiry_date", v.fitness_expiry_date)}
            {td(v, "puc_expiry_date", v.puc_expiry_date)}
            {td(v, "cng_leakage_test", v.cng_leakage_test)}
            {td(v, "tax_receipt_validity_date", v.tax_receipt_validity_date)}
            {td(v, "road_tax_mv_tax", v.road_tax_mv_tax)}

            <td>{v.driver_dl_no}</td>
            <td>{v.driver_name}</td>
            <td>{v.dl_no}</td>

            {td(v, "dl_expiry_date", v.dl_expiry_date)}

            <td>{v.claim}</td>

            {td(v, "rc_valid_till_date", v.rc_valid_till_date)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehicleTable;
