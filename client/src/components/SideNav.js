import React, { useState } from "react";
import "../styles/SideNav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faDollarSign,
  faUserPlus,
  faBriefcaseMedical,
  faHome,
  faCaretDown,
  faCaretUp,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

function SideNav() {
  const [showInvoiceDropdown, setShowInvoiceDropdown] = useState(false);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [showTestDropdown, setShowTestDropdown] = useState(false);
  const [showInventoryDropdown, setShowInventoryDropdown] = useState(false);

  const toggleInvoiceDropdown = () => {
    setShowInvoiceDropdown(!showInvoiceDropdown);
    setShowPatientDropdown(false);
    setShowTestDropdown(false);
    setShowInventoryDropdown(false);
  };

  const togglePatientDropdown = () => {
    setShowInvoiceDropdown(false);
    setShowPatientDropdown(!showPatientDropdown);
    setShowTestDropdown(false);
    setShowInventoryDropdown(false);
  };

  const toggleTestDropdown = () => {
    setShowInvoiceDropdown(false);
    setShowPatientDropdown(false);
    setShowTestDropdown(!showTestDropdown);
    setShowInventoryDropdown(false);
  };

  const toggleInventoryDropdown = () => {
    setShowInvoiceDropdown(false);
    setShowPatientDropdown(false);
    setShowTestDropdown(false);
    setShowInventoryDropdown(!showInventoryDropdown);
  };

  function handleLogout() {
    localStorage.removeItem("userRole");
    window.location.replace("/");
  }

  return (
    <div className="sidenav1">
      <div style={{ textAlign: "center" }}>
        <FontAwesomeIcon
          icon={faUserAlt}
          style={{ fontSize: "48px", color: "grey" }}
        />
        <h2 style={{ color: "#d00000" }}>Receptionist</h2>
      </div>
      <button className="dropdown-btn" onClick={toggleInvoiceDropdown}>
        <FontAwesomeIcon icon={faDollarSign} /> Invoice{" "}
        {showInvoiceDropdown ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </button>
      {showInvoiceDropdown && (
        <div className="dropdown-container">
          <Link to="/add_invoice">Add Invoice</Link>
          <Link to="/manage_invoice">Manage Invoice</Link>
        </div>
      )}
      <button className="dropdown-btn" onClick={togglePatientDropdown}>
        <FontAwesomeIcon icon={faUserPlus} /> Patient{" "}
        {showPatientDropdown ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </button>
      {showPatientDropdown && (
        <div className="dropdown-container">
          <Link to="/add">Add Patient</Link>
          <Link to="/manage">Manage Patient</Link>
        </div>
      )}
      <button className="dropdown-btn" onClick={toggleTestDropdown}>
        <FontAwesomeIcon icon={faBriefcaseMedical} /> Tests{" "}
        {showTestDropdown ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </button>
      {showTestDropdown && (
        <div className="dropdown-container">
          <Link to="/add_test">Add Test</Link>
          <Link to="/manage_test">Manage Test</Link>
        </div>
      )}
      <button className="dropdown-btn" onClick={toggleInventoryDropdown}>
        <FontAwesomeIcon icon={faBox} /> Inventory{" "}
        {showInventoryDropdown ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </button>
      {showInventoryDropdown && (
        <div className="dropdown-container">
          <Link to="/add_inventory">Add Inventory</Link>
          <Link to="/manage_inventory">Manage Inventory</Link>
        </div>
      )}
      <Link onClick={handleLogout}>
        <FontAwesomeIcon icon={faHome} /> Logout
      </Link>
    </div>
  );
}

export default SideNav;
