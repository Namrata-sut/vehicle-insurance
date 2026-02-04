import React, { useState, useEffect } from "react";
import API from "../services/api";
import VehicleTable from "./VehicleTable";
import VehicleList from "./VehicleList";
import InsuranceExpiryTable from "./InsuranceExpiryTable";
import * as XLSX from "xlsx-js-style";

import "./Dashboard.css";

const Dashboard = () => {

  const [vehicles, setVehicles] = useState([]);
  const [title, setTitle] = useState("");
  const [tableMode, setTableMode] = useState("full");
  // full | simple

  const [showVehicleList, setShowVehicleList] = useState(false);

  // 👉 count for only clicked button
  const [currentCount, setCurrentCount] = useState(null);
  const [currentLabel, setCurrentLabel] = useState("");

  // 👉 All counts from backend
  const [counts, setCounts] = useState({
    valid: 0,
    expired: 0,
    seven: 0,
    thirty: 0,
    claims: 0,
    fifteen: 0,
    total: 0
  });

  // ================= LOAD COUNTS ON START =================
  useEffect(() => {
    loadCounts();
  }, []);

  // ================= FETCH ALL COUNTS =================
  const loadCounts = async () => {
  try {
    const [
      valid,
      expired,
      seven,
      fifteen,
      thirty,
      claims,
      total
    ] = await Promise.all([
      API.get("/insurance-docs/count-valid"),
      API.get("/insurance-docs/count-expired"),
      API.get("/insurance-docs/count-7-days"),

      // 🔥 FIXED ENDPOINTS
      API.get("/insurance-docs/expiring-in-15-days"),
      API.get("/insurance-docs/expiring-in-30-days"),

      API.get("/insurance-docs/count-claims"),
      API.get("/insurance-docs/count_total_docs"),
    ]);

    console.log("7 days:", seven.data);
    console.log("15 days:", fifteen.data);
    console.log("30 days:", thirty.data);

    const newCounts = {
      valid: valid.data.total_valid_documents,
      expired: expired.data.total_expired_documents,

      seven: seven.data.expiring_in_7_days,

      // 🔥 CORRECT KEYS
      fifteen: fifteen.data.expiring_in_15_days,
      thirty: thirty.data.expiring_in_30_days,

      claims: claims.data.active_claims_count,

      total: total.data.total_documents_tracked,
    };

    setCounts(newCounts);

    showTotalDocsTracked(newCounts);

  } catch (err) {
    console.error("Error loading counts", err);
  }
};

  // ================= LOAD TABLE DATA =================
const loadData = (url, titleText, countValue, label, mode = "full") => {

  setTitle(titleText);
  setShowVehicleList(false);
  setTableMode(mode);

  API.get(url)
    .then((res) => {
      setVehicles(res.data.vehicles);

      setCurrentCount(countValue);
      setCurrentLabel(label);
    })
    .catch(() => alert("Error loading data"));
};


  // ================= FIRST BUTTON =================
  const showTotalDocsTracked = (freshCounts = counts) => {

  setTitle("📄 Total Documents Tracked");
  setShowVehicleList(false);   // 👉 show table not list

  setCurrentCount(freshCounts.total);
  setCurrentLabel("Total Documents");

  // 👉 LOAD ALL VEHICLES BY DEFAULT
  API.get("/insurance-docs/total-valid-docs")
    .then((res) => {
      setVehicles(res.data.vehicles);
    })
    .catch(() => alert("Error loading total vehicles"));
  };

  // ================= DOWNLOAD CSV =================
    const getColorStyle = (date) => {
      if (!date) return {};

      const today = new Date();
      const d = new Date(date);

      const diff = (d - today) / (1000 * 60 * 60 * 24);

      // 🔴 expired
      if (d < today) {
        return { fill: { fgColor: { rgb: "FFCDD2" } } };
      }

      // 🟡 within 7 days
      if (diff <= 7) {
        return { fill: { fgColor: { rgb: "FFF9C4" } } };
      }

      // 🟠 within 30 days
      if (diff <= 30) {
        return { fill: { fgColor: { rgb: "FFE0B2" } } };
      }

      // 🟢 valid
      return { fill: { fgColor: { rgb: "C8E6C9" } } };
    };

    const formatDate = (date) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-GB");
    };
    // ===== COMMON HEADER STYLE FUNCTION =====
    const applyHeaderStyle = (ws) => {

      const range = XLSX.utils.decode_range(ws["!ref"]);

      for (let C = range.s.c; C <= range.e.c; ++C) {

        const address = XLSX.utils.encode_cell({ r: 0, c: C });

        if (!ws[address]) continue;

        ws[address].s = {
          font: {
            bold: true,
            color: { rgb: "000000" }
          },
          fill: {
            fgColor: { rgb: "BBDEFB" }   // 👉 LIGHT BLUE
          },
          alignment: {
            horizontal: "center",
            vertical: "center"
          }
        };
      }
    };

    const downloadCSV = () => {
      if (!vehicles || vehicles.length === 0) {
        alert("No data to download");
        return;
      }

      let data = [];
      let ws;

      // ===== 7 / 15 / 30 DAYS SCREENS =====
      if (
        title.includes("7 Days") ||
        title.includes("15 Days") ||
        title.includes("30 Days")
      ) {

        data = vehicles.map(v => ({
          "SL No": v.sl_no,
          "Name": v.name,
          "Reg No": v.reg_no,
          "Policy No": v.policy_no,
          "Insurance Expiry": formatDate(v.insurance_expiry_date),
        }));

        ws = XLSX.utils.json_to_sheet(data);

        // ✅ APPLY HEADER STYLE
        applyHeaderStyle(ws);

        vehicles.forEach((v, i) => {
          const style = getColorStyle(v.insurance_expiry_date);
          ws[`E${i + 2}`].s = style;
        });
      }

      // ===== TOTAL + ALL OK + EXPIRED + CLAIMS =====
      else {

        data = vehicles.map(v => ({
          "SL No": v.sl_no,
          "Name": v.name,
          "Reg No": v.reg_no,
          "Policy No": v.policy_no,

          "Insurance Expiry": formatDate(v.insurance_expiry_date),
          "Permit Expiry": formatDate(v.permit_expiry_date),
          "Fitness Expiry": formatDate(v.fitness_expiry_date),
          "PUC Expiry": formatDate(v.puc_expiry_date),

          "Driver Name": v.driver_name,
          "DL Expiry": formatDate(v.dl_expiry_date),

          "Claim": v.claim,
          "RC Valid Till": formatDate(v.rc_valid_till_date),
        }));

        ws = XLSX.utils.json_to_sheet(data);

        // ✅ APPLY HEADER STYLE HERE ALSO
        applyHeaderStyle(ws);

        vehicles.forEach((v, i) => {
          ws[`E${i + 2}`].s = getColorStyle(v.insurance_expiry_date);
          ws[`F${i + 2}`].s = getColorStyle(v.permit_expiry_date);
          ws[`G${i + 2}`].s = getColorStyle(v.fitness_expiry_date);
          ws[`H${i + 2}`].s = getColorStyle(v.puc_expiry_date);
          ws[`J${i + 2}`].s = getColorStyle(v.dl_expiry_date);
          ws[`L${i + 2}`].s = getColorStyle(v.rc_valid_till_date);
        });
      }

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Vehicles");

      XLSX.writeFile(
        wb,
        `${title.replace(/[^a-zA-Z0-9]/g, "_")}.xlsx`
      );
    };

  // ================= UI =================
  return (
    <div className="dashboard-container">

      <div className="dashboard-buttons">

        <button className="all" onClick={() => showTotalDocsTracked()}>
          📄 Total Documents Tracked
        </button>

        <button
          className="ok"
          onClick={() =>
            loadData(
              "/insurance-docs/total-valid-docs",
              "✅ ALL Docs OK Vehicles",
              counts.valid,
              "Valid Documents"
            )
          }
        >
          ✅ALL Docs OK Vehicles
        </button>

        <button
          className="expired"
          onClick={() =>
            loadData(
              "/insurance-docs/total-expired-docs",
              "🔴 Expired Docs Vehicles",
              counts.expired,
              "Expired Documents"
            )
          }
        >
          🔴 Expired Docs Vehicles
        </button>

        <button
          className="seven"
          onClick={() =>
            loadData(
              "/insurance-docs/expiring-in-7-days",
              "🔴 Expiring in 7 Days",
              counts.seven,
              "🔴 Insurance Expiring in 7 Days",
              "simple"
            )
          }
        >
           🔴Insurance Expiring in 7 Days
        </button>

        <button
          className="fifteen"
          onClick={() =>
            loadData(
              "/insurance-docs/expiring-in-15-days",
              "🟠 Expiring in 15 Days",
              counts.fifteen,
              "Insurance Expiring in 15 Days",
              "simple"
            )
          }
        >
           🟠Insurance Expiring in 15 Days
        </button>

        <button
          className="thirty"
          onClick={() =>
            loadData(
              "/insurance-docs/expiring-in-30-days",
              "🟡 Expiring in 30 Days",
              counts.thirty,
              "Insurance Expiring in 30 Days",
              "simple"
            )
          }
        >
           🟡Insurance Expiring in 30 Days
        </button>

        <button
          className="claim"
          onClick={() =>
            loadData(
              "/insurance-docs/active-claims",
              "⚠️ Claims Active",
              counts.claims,
              "Active Claims"
            )
          }
        >
          ⚠️Claims Active
        </button>
      </div>

      {/* 👉 COUNT INSIDE HEADING */}
      <h3>
        {title}
        {currentCount !== null ? ` : ${currentCount}` : ""}
      </h3>

      {showVehicleList ? (
        <>
          <VehicleList />

          <button className="download-btn" onClick={downloadCSV}>
            ⬇ Download Data
          </button>
        </>
      ) : (
        <>
            {tableMode === "simple" ? (
              <InsuranceExpiryTable vehicles={vehicles} />
            ) : (
              <VehicleTable vehicles={vehicles} />
            )}

          <button className="download-btn" onClick={downloadCSV}>
            ⬇ Download Data
          </button>
        </>
      )}

    </div>
  );
};

export default Dashboard;
