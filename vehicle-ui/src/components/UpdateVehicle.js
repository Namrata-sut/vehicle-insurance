import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./UpdateVehicle.css";

function UpdateVehicle() {
  const location = useLocation();
  const navigate = useNavigate();

  const vehicle = location.state?.vehicle;

  const [form, setForm] = useState({ ...vehicle });

  if (!vehicle) {
    return <h3>No Vehicle Selected</h3>;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ===== SEND ONLY CHANGED FIELDS =====
  const handleSubmit = async () => {
    const payload = {};

    Object.keys(form).forEach((key) => {
      if (form[key] !== vehicle[key]) {
        payload[key] = form[key];
      }
    });

    if (Object.keys(payload).length === 0) {
      alert("No changes made");
      return;
    }

    try {
      await API.patch(`/vehicles/${vehicle.reg_no}`, payload);

      alert("Updated Successfully");
      navigate("/list");

    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  const input = (label, name, type = "text") => (
    <div className="form-group">
      <label>{label}</label>

      <input
        type={type}
        name={name}
        value={form[name] || ""}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="form-container">

      <h2>Update Vehicle</h2>

      <div className="form-grid">

        {input("SL No", "sl_no")}

        {input("Owner Name", "name")}

        {input("Registration No", "reg_no")}

        {input("Policy No", "policy_no")}

        {input("Insurance Expiry", "insurance_expiry_date", "date")}

        {input("Permit Expiry", "permit_expiry_date", "date")}

        {input("Permit Authorization", "permit_authorization_date", "date")}

        {input("Fitness Expiry", "fitness_expiry_date", "date")}

        {input("PUC Expiry", "puc_expiry_date", "date")}

        {input("CNG Leakage Test", "cng_leakage_test", "date")}

        {input("Tax Receipt Validity", "tax_receipt_validity_date", "date")}

        {input("Road Tax", "road_tax_mv_tax", "date")}

        {input("Driver Name", "driver_name")}

        {input("Driver DL No", "driver_dl_no")}

        {input("DL No", "dl_no")}

        {input("DL Expiry", "dl_expiry_date", "date")}

        {input("RC Valid Till", "rc_valid_till_date", "date")}

        {/* CLAIM DROPDOWN */}
        <div className="form-group">
          <label>Claim</label>

          <select
            name="claim"
            value={form.claim || ""}
            onChange={handleChange}
          >
            <option value="NO">NO</option>
            <option value="YES">YES</option>
          </select>
        </div>

      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Update Vehicle
      </button>

    </div>
  );
}

export default UpdateVehicle;
