import React from "react";
import { useLocation } from "react-router-dom";

function Header({ onShowForm, text, background }) {
  const location = useLocation();

  return (
    <header className="header">
      <h1>Task Tracker</h1>
      {location.pathname === "/" && (
        <button
          onClick={onShowForm}
          style={{ backgroundColor: background }}
          className="btn"
        >
          {text}
        </button>
      )}
    </header>
  );
}

export default Header;
