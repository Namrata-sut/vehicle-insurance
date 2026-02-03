import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Summary.css";

const Summary = () => {

  const [data, setData] = useState(null);
  const [tab, setTab] = useState("insurance");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await API.get("/vehicle-insurance/expired/details");
    setData(res.data);
  };
  const isExpired = (date) => {
      if (!date) return false;
      return new Date(date) < new Date();
  };


  if (!data) return <h3>Loading...</h3>;

  const tabs = [
    { key: "insurance", label: "TOTAL INSURANCE EXPIRED" },
    { key: "permit", label: "TOTAL PERMIT EXPIRED" },
    { key: "permit_auth", label: "TOTAL PERMIT AUTHORIZATION EXPIRED" },
    { key: "fitness", label: "TOTAL FITNESS EXPIRED" },
    { key: "road_tax", label: "TOTAL ROAD TAX / MV TAX EXPIRED" },
    { key: "puc", label: "TOTAL PUC EXPIRED" },
    { key: "cng", label: "TOTAL CNG LEAKAGE TEST EXPIRED" },
    { key: "driver_dl", label: "TOTAL DRIVER DL NO. / EXPIRED" },
    { key: "tax_receipt", label: "TOTAL TAX RECEIPT VALIDITY EXPIRED" },
    { key: "rc", label: "TOTAL RC EXPIRED" },
  ];

  const list = data[tab];

  return (
    <div className="summary-container">
      <h2>Expired Documents Summary</h2>

      {/* TABS */}
      <div className="tab-bar">
        {tabs.map(t => (
          <button
            key={t.key}
            className={tab === t.key ? "active" : ""}
            onClick={() => setTab(t.key)}
          >
            {t.label} ({data[t.key].length})
          </button>
        ))}
      </div>

      <table>
      <thead>
        <tr>
          <th>SL No</th>
          <th>Owner</th>
          <th>Reg No</th>
          <th>Policy No</th>

          <th>Insurance Expiry</th>
          <th>Permit Expiry</th>
          <th>Permit Authorization</th>
          <th>Fitness Expiry</th>
          <th>PUC Expiry</th>
          <th>CNG Leakage</th>

          <th>Tax Receipt</th>
          <th>Road Tax</th>

          <th>DL Expiry</th>

          <th>Claim</th>
          <th>RC Valid Till</th>
        </tr>
      </thead>

      <tbody>
        {list.map(v => (
          <tr key={v.id}>

            <td>{v.sl_no}</td>
            <td>{v.name}</td>
            <td>{v.reg_no}</td>
            <td>{v.policy_no}</td>

            <td className={isExpired(v.insurance_expiry_date) ? "expired" : ""}>
              {v.insurance_expiry_date}
            </td>
            <td className={isExpired(v.permit_expiry_date) ? "expired" : ""}>
                {v.permit_expiry_date}
            </td>
            <td className={isExpired(v.permit_authorization_date) ? "expired" : ""}>
                {v.permit_authorization_date}
            </td>
            <td className={isExpired(v.fitness_expiry_date) ? "expired" : ""}>
                {v.fitness_expiry_date}
            </td>
            <td className={isExpired(v.puc_expiry_date) ? "expired" : ""}>
                {v.puc_expiry_date}
            </td>
            <td className={isExpired(v.cng_leakage_test) ? "expired" : ""}>
                {v.cng_leakage_test}
            </td>
            <td className={isExpired(v.tax_receipt_validity_date) ? "expired" : ""}>
                {v.tax_receipt_validity_date}
            </td>
            <td className={isExpired(v.road_tax_mv_tax) ? "expired" : ""}>
                {v.road_tax_mv_tax}
            </td>
            <td className={isExpired(v.dl_expiry_date) ? "expired" : ""}>
                {v.dl_expiry_date}
            </td>
            <td className={isExpired(v.claim) ? "expired" : ""}>
                {v.claim}
            </td>
            <td className={isExpired(v.rc_valid_till_date) ? "expired" : ""}>
                {v.rc_valid_till_date}
            </td>
          </tr>
        ))}
      </tbody>
    </table>


    </div>
  );
};

export default Summary;
