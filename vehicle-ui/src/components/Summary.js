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
    { key: "claims", label: "TOTAL ACTIVE CLAIMS" },
  ];

  const list = data?.[tab] || [];

  // ====== TABLE RENDER BY TAB ======

  const renderTable = () => {

    // ===== INSURANCE TAB =====
    if (tab === "insurance") {
      return (
        <>
          <th>REG. NO.</th>
          <th>POLICY NO.</th>
          <th>INSURANCE EXPIRY DATE</th>
          <th>Company Name</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td>{v.policy_no}</td>
              <td className={isExpired(v.insurance_expiry_date) ? "expired" : ""}>
                {v.insurance_expiry_date}
              </td>
              <td>{v.name}</td>
            </tr>
          ))}
        </>
      );
    }

    // ===== PERMIT TAB =====
    if (tab === "permit") {
      return (
        <>
          <th>REG. NO.</th>
          <th>PERMIT EXPIRY DATE</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td className={isExpired(v.permit_expiry_date) ? "expired" : ""}>
                {v.permit_expiry_date}
              </td>
            </tr>
          ))}
        </>
      );
    }

    // ===== PERMIT AUTH =====
    if (tab === "permit_auth") {
      return (
        <>
          <th>REG. NO.</th>
          <th>PERMIT AUTHORIZATION DATE</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td className={isExpired(v.permit_authorization_date) ? "expired" : ""}>
                {v.permit_authorization_date}
              </td>
            </tr>
          ))}
        </>
      );
    }

    // ===== FITNESS =====
    if (tab === "fitness") {
      return (
        <>
          <th>REG. NO.</th>
          <th>FITNESS EXPIRY DATE</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td className={isExpired(v.fitness_expiry_date) ? "expired" : ""}>
                {v.fitness_expiry_date}
              </td>
            </tr>
          ))}
        </>
      );
    }

    // ===== ROAD TAX =====
    if (tab === "road_tax") {
      return (
        <>
          <th>REG. NO.</th>
          <th>ROAD TAX / MV TAX</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td className={isExpired(v.road_tax_mv_tax) ? "expired" : ""}>
                {v.road_tax_mv_tax}
              </td>
            </tr>
          ))}
        </>
      );
    }

    // ===== PUC =====
    if (tab === "puc") {
      return (
        <>
          <th>REG. NO.</th>
          <th>PUC EXPIRY DATE</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td className={isExpired(v.puc_expiry_date) ? "expired" : ""}>
                {v.puc_expiry_date}
              </td>
            </tr>
          ))}
        </>
      );
    }

    // ===== CNG =====
    if (tab === "cng") {
      return (
        <>
          <th>REG. NO.</th>
          <th>CNG LEAKAGE TEST</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td className={isExpired(v.cng_leakage_test) ? "expired" : ""}>
                {v.cng_leakage_test}
              </td>
            </tr>
          ))}
        </>
      );
    }

    // ===== DRIVER DL =====
    if (tab === "driver_dl") {
      return (
        <>
          <th>REG. NO.</th>
          <th>DL EXPIRY DATE</th>
          <th>DRIVER DL NO.</th>
          <th>DRIVER NAME</th>
          <th>DL NO.</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td className={isExpired(v.dl_expiry_date) ? "expired" : ""}>
                {v.dl_expiry_date}
              </td>
              <td>{v.driver_dl_no}</td>
              <td>{v.driver_name}</td>
              <td>{v.dl_no}</td>
            </tr>
          ))}
        </>
      );
    }

    // ===== TAX RECEIPT =====
    if (tab === "tax_receipt") {
      return (
        <>
          <th>REG. NO.</th>
          <th>TAX RECEIPT VALIDITY DATE</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td className={isExpired(v.tax_receipt_validity_date) ? "expired" : ""}>
                {v.tax_receipt_validity_date}
              </td>
            </tr>
          ))}
        </>
      );
    }

    // ===== RC =====
    if (tab === "rc") {
      return (
        <>
          <th>REG. NO.</th>
          <th>RC VALID TILL DATE</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td className={isExpired(v.rc_valid_till_date) ? "expired" : ""}>
                {v.rc_valid_till_date}
              </td>
            </tr>
          ))}
        </>
      );
    }

    // ===== CLAIMS =====
    if (tab === "claims") {
      return (
        <>
          <th>REG. NO.</th>
          <th>CLAIM (YES / NO)</th>

          {list.map(v => (
            <tr key={v.id}>
              <td>{v.reg_no}</td>
              <td>{v.claim}</td>
            </tr>
          ))}
        </>
      );
    }
  };

  return (
    <div className="summary-container">

      <h2>Expired Documents Summary</h2>

      <div className="tab-bar">
        {tabs.map(t => (
          <button
            key={t.key}
            className={tab === t.key ? "active" : ""}
            onClick={() => setTab(t.key)}
          >
            {t.label} ({data[t.key]?.length})
          </button>
        ))}
      </div>

      <table>

  {/* ===== HEADER ===== */}
  <thead>
    {tab === "driver_dl" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>DL EXPIRY DATE</th>
        <th>DRIVER DL NO.</th>
        <th>DRIVER NAME</th>
        <th>DL NO.</th>
      </tr>
    )}

    {tab === "insurance" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>POLICY NO.</th>
        <th>INSURANCE EXPIRY DATE</th>
        <th>Company Name</th>
      </tr>
    )}

    {tab === "permit" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>PERMIT EXPIRY DATE</th>
      </tr>
    )}

    {tab === "permit_auth" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>PERMIT AUTHORIZATION DATE</th>
      </tr>
    )}

    {tab === "road_tax" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>ROAD TAX / MV TAX</th>
      </tr>
    )}

    {tab === "puc" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>PUC EXPIRY DATE</th>
      </tr>
    )}

    {tab === "cng" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>CNG LEAKAGE TEST</th>
      </tr>
    )}

    {tab === "fitness" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>FITNESS EXPIRY DATE</th>
      </tr>
    )}

    {tab === "tax_receipt" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>TAX RECEIPT VALIDITY DATE</th>
      </tr>
    )}

    {tab === "rc" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>RC VALID TILL DATE</th>
      </tr>
    )}

    {tab === "claims" && (
      <tr>
        <th>SL NO</th>
        <th>REG. NO.</th>
        <th>CLAIM (YES / NO)</th>
      </tr>
    )}
  </thead>

  {/* ===== ROWS ===== */}
  <tbody>

        {tab === "driver_dl" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>

              <td className={isExpired(v.dl_expiry_date) ? "expired" : ""}>
                {v.dl_expiry_date}
              </td>

              <td>{v.driver_dl_no}</td>
              <td>{v.driver_name}</td>
              <td>{v.dl_no}</td>
            </tr>
          ))
        }

        {tab === "insurance" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>
              <td>{v.policy_no}</td>

              <td className={isExpired(v.insurance_expiry_date) ? "expired" : ""}>
                {v.insurance_expiry_date}
              </td>

              <td>{v.name}</td>
            </tr>
          ))
        }

        {tab === "permit" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>

              <td className={isExpired(v.permit_expiry_date) ? "expired" : ""}>
                {v.permit_expiry_date}
              </td>
            </tr>
          ))
        }

        {tab === "permit_auth" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>

              <td className={isExpired(v.permit_authorization_date) ? "expired" : ""}>
                {v.permit_authorization_date}
              </td>
            </tr>
          ))
        }

        {tab === "road_tax" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>

              <td className={isExpired(v.road_tax_mv_tax) ? "expired" : ""}>
                {v.road_tax_mv_tax}
              </td>
            </tr>
          ))
        }

        {tab === "puc" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>

              <td className={isExpired(v.puc_expiry_date) ? "expired" : ""}>
                {v.puc_expiry_date}
              </td>
            </tr>
          ))
        }

        {tab === "cng" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>

              <td className={isExpired(v.cng_leakage_test) ? "expired" : ""}>
                {v.cng_leakage_test}
              </td>
            </tr>
          ))
        }

        {tab === "fitness" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>

              <td className={isExpired(v.fitness_expiry_date) ? "expired" : ""}>
                {v.fitness_expiry_date}
              </td>
            </tr>
          ))
        }

        {tab === "tax_receipt" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>

              <td className={isExpired(v.tax_receipt_validity_date) ? "expired" : ""}>
                {v.tax_receipt_validity_date}
              </td>
            </tr>
          ))
        }

        {tab === "rc" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>

              <td className={isExpired(v.rc_valid_till_date) ? "expired" : ""}>
                {v.rc_valid_till_date}
              </td>
            </tr>
          ))
        }

        {tab === "claims" &&
          list.map((v, i) => (
            <tr key={v.id}>
              <td>{i + 1}</td>
              <td>{v.reg_no}</td>
              <td>{v.claim}</td>
            </tr>
          ))
        }

      </tbody>
    </table>
    </div>
  );
};

export default Summary;
