import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import * as XLSX from "xlsx-js-style";
import "./VehicleList.css";

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await API.get("/vehicles/");
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  // ======= NAVIGATE TO UPDATE =======
  const handleUpdate = () => {
    if (!selected) return;

    navigate("/update", {
      state: { vehicle: selected }
    });
  };

  // =============== DOWNLOAD EXCEL ===============
  const downloadExcel = () => {
    if (!vehicles || vehicles.length === 0) {
      alert("No data to download");
      return;
    }

    const data = vehicles.map(v => ({
      "SL No": v.sl_no,
      "Name": v.name,
      "Reg No": v.reg_no,
      "Policy No": v.policy_no,

      "Insurance Expiry": v.insurance_expiry_date,
      "Permit Expiry": v.permit_expiry_date,
      "Permit Authorization": v.permit_authorization_date,
      "Fitness Expiry": v.fitness_expiry_date,
      "PUC Expiry": v.puc_expiry_date,
      "CNG Leakage Test": v.cng_leakage_test,
      "Tax Receipt Validity": v.tax_receipt_validity_date,
      "Road Tax": v.road_tax_mv_tax,

      "Driver DL No": v.driver_dl_no,
      "Driver Name": v.driver_name,
      "DL No": v.dl_no,
      "DL Expiry": v.dl_expiry_date,

      "Claim": v.claim,
      "RC Valid Till": v.rc_valid_till_date,
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    const range = XLSX.utils.decode_range(ws["!ref"]);

    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: 0, c: C });

      if (!ws[address]) continue;

      ws[address].s = {
        font: { bold: true, color: { rgb: "000000" } },
        fill: { fgColor: { rgb: "BBDEFB" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vehicles");

    XLSX.writeFile(wb, "Vehicle_List.xlsx");
  };

  return (
    <div className="vehicle-container">

      <div className="top-actions">
        <h2>Vehicle Insurance Details</h2>

        <div>
          <button
            className="update-btn"
            disabled={!selected}
            onClick={handleUpdate}
          >
            ✏ Update
          </button>

          <button className="download-btn" onClick={downloadExcel}>
            ⬇ Download Data
          </button>
        </div>
      </div>

      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>SL No</th>
            <th>Name</th>
            <th>Reg No</th>
            <th>Policy No</th>

            <th>Insurance Expiry</th>
            <th>Permit Expiry</th>
            <th>Permit Authorization</th>
            <th>Fitness Expiry</th>
            <th>PUC Expiry</th>
            <th>CNG Leakage Test</th>
            <th>Tax Receipt Validity</th>
            <th>Road Tax</th>

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
              <td>
                <input
                  type="radio"
                  name="selectRow"
                  onChange={() => setSelected(v)}
                />
              </td>

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
    </div>
  );
}

export default VehicleList;
