import React, { useState } from "react";
import API from "../services/api";
import "./AddVehicle.css";

const AddVehicle = () => {
  const [form, setForm] = useState({
    sl_no: "",
    name: "",
    reg_no: "",
    policy_no: "",

    insurance_expiry_date: "",
    permit_expiry_date: "",
    permit_authorization_date: "",
    fitness_expiry_date: "",
    puc_expiry_date: "",
    cng_leakage_test: "",
    tax_receipt_validity_date: "",
    road_tax_mv_tax: "",

    driver_dl_no: "",
    driver_name: "",
    dl_no: "",
    dl_expiry_date: "",

    claim: "NO",
    rc_valid_till_date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const submit = async () => {
  try {

    // 👉 Convert empty string → null for dates
    const payload = {
      ...form,

      sl_no: form.sl_no ? parseInt(form.sl_no) : null,

      insurance_expiry_date: form.insurance_expiry_date || null,
      permit_expiry_date: form.permit_expiry_date || null,
      permit_authorization_date: form.permit_authorization_date || null,
      fitness_expiry_date: form.fitness_expiry_date || null,
      puc_expiry_date: form.puc_expiry_date || null,
      cng_leakage_test: form.cng_leakage_test || null,
      tax_receipt_validity_date: form.tax_receipt_validity_date || null,
      road_tax_mv_tax: form.road_tax_mv_tax || null,
      dl_expiry_date: form.dl_expiry_date || null,
      rc_valid_till_date: form.rc_valid_till_date || null,
    };

    await API.post("/vehicles/", payload);


    alert("Vehicle created successfully ✅");

    // 👉 Reset form after success
    setForm({
      sl_no: "",
      name: "",
      reg_no: "",
      policy_no: "",

      insurance_expiry_date: "",
      permit_expiry_date: "",
      permit_authorization_date: "",
      fitness_expiry_date: "",
      puc_expiry_date: "",
      cng_leakage_test: "",
      tax_receipt_validity_date: "",
      road_tax_mv_tax: "",

      driver_dl_no: "",
      driver_name: "",
      dl_no: "",
      dl_expiry_date: "",

      claim: "NO",
      rc_valid_till_date: ""
    });

  } catch (error) {
    console.error(error.response?.data || error);
    alert("Error creating vehicle ❌");
  }
};

  return (
    <div className="add-vehicle-container">
      <h2>Add Vehicle</h2>

      <div className="form-grid">
        <div className="form-field">
          <label>SL No</label>
          <input name="sl_no" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Owner Name</label>
          <input name="name" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Registration No</label>
          <input name="reg_no" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Policy No</label>
          <input name="policy_no" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Insurance Expiry</label>
          <input type="date" name="insurance_expiry_date" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Permit Expiry</label>
          <input type="date" name="permit_expiry_date" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Permit Authorization</label>
          <input type="date" name="permit_authorization_date" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Fitness Expiry</label>
          <input type="date" name="fitness_expiry_date" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>PUC Expiry</label>
          <input type="date" name="puc_expiry_date" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>CNG Leakage Test</label>
          <input type="date" name="cng_leakage_test" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Tax Receipt Validity</label>
          <input type="date" name="tax_receipt_validity_date" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Road Tax</label>
          <input type="date" name="road_tax_mv_tax" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Driver Name</label>
          <input name="driver_name" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Driver DL No</label>
          <input name="driver_dl_no" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>DL No</label>
          <input name="dl_no" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>DL Expiry</label>
          <input type="date" name="dl_expiry_date" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>RC Valid Till</label>
          <input type="date" name="rc_valid_till_date" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Claim</label>
          <select name="claim" onChange={handleChange}>
            <option value="NO">NO</option>
            <option value="YES">YES</option>
          </select>
        </div>
      </div>

  <button className="create-btn" onClick={submit}>
    Create Vehicle
  </button>

</div>

  );
};

export default AddVehicle;
