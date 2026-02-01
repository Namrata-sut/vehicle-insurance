import React, { useState, useEffect } from "react";
import API from "../services/api";
import VehicleTable from "./VehicleTable";
import VehicleList from "./VehicleList";
import "./Dashboard.css";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [title, setTitle] = useState("");
  const [showVehicleList, setShowVehicleList] = useState(false);

  const loadData = (url, titleText) => {
    setTitle(titleText);
    setShowVehicleList(false);

    API.get(url)
      .then(res => setVehicles(res.data.vehicles))
      .catch(() => alert("Error loading data"));
  };

  const showTotalDocsTracked = () => {
    setTitle("📄 Total Documents Tracked");
    setShowVehicleList(true);
  };

  useEffect(() => {
    showTotalDocsTracked();
  }, []);

  const downloadCSV = () => {
    if (!vehicles || vehicles.length === 0) {
      alert("No data to download");
      return;
    }

    const headers = Object.keys(vehicles[0]).join(",");

    const rows = vehicles
      .map(v =>
        Object.values(v)
          .map(val => `"${val}"`)
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

  return (
    <div className="dashboard-container">

      <div className="dashboard-buttons">

        <button className="all" onClick={showTotalDocsTracked}>
          📄 Total Documents Tracked
        </button>

        <button
          className="ok"
          onClick={() =>
            loadData("/insurance-docs/total-valid-docs", "✅ ALL Docs OK Vehicles")
          }
        >
          ✅ ALL Docs OK Vehicles
        </button>

        <button
          className="expired"
          onClick={() =>
            loadData("/insurance-docs/total-expired-docs", "🔴 Expired Docs Vehicles")
          }
        >
          🔴 Expired Docs Vehicles
        </button>

        <button
          className="seven"
          onClick={() =>
            loadData("/insurance-docs/expiring-in-7-days", "🟡 Expiring in 7 Days")
          }
        >
          🟡 Expiring in 7 Days
        </button>

        <button
          className="thirty"
          onClick={() =>
            loadData("/insurance-docs/expiring-in-30-days", "🟠 Expiring in 30 Days")
          }
        >
          🟠 Expiring in 30 Days
        </button>

        <button
          className="claim"
          onClick={() =>
            loadData("/insurance-docs/active-claims", "⚠️ Claims Active")
          }
        >
          ⚠️ Claims Active
        </button>
      </div>

      <h3>{title}</h3>

      {showVehicleList ? (
        <>
          <VehicleList />

          <button className="download-btn" onClick={downloadCSV}>
            ⬇ Download Data
          </button>
        </>
      ) : (
        <>
          <VehicleTable vehicles={vehicles} />

          <button className="download-btn" onClick={downloadCSV}>
            ⬇ Download Data
          </button>
        </>
      )}

    </div>
  );
};

export default Dashboard;
