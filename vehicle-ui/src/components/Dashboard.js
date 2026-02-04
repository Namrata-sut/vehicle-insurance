import React, { useState, useEffect } from "react";
import API from "../services/api";
import VehicleTable from "./VehicleTable";
import VehicleList from "./VehicleList";
import InsuranceExpiryTable from "./InsuranceExpiryTable";

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
  const downloadCSV = () => {

    if (!vehicles || vehicles.length === 0) {
      alert("No data to download");
      return;
    }

    const headers = Object.keys(vehicles[0]).join(",");

    const rows = vehicles
      .map((v) =>
        Object.values(v)
          .map((val) => `"${val}"`)
          .join(",")
      )
      .join("\n");

    const csv = headers + "\n" + rows;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "vehicle_insurance_data.csv";
    a.click();
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
