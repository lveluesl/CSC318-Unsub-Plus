import React from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";

function Layout({ children, hideNav }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-brand">
          <span className="app-name">Unsub+</span>
          <span className="app-tagline">See. Control. Cancel.</span>
        </div>
        {!hideNav && (
          <nav className="app-nav">
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/alerts" className="nav-link">
              Alerts
            </NavLink>
            <NavLink to="/settings" className="nav-link">
              Settings
            </NavLink>
          </nav>
        )}
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}

export default Layout;

