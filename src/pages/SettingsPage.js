import React from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";

function SettingsPage({ connectedSources, setConnectedSources }) {
  const navigate = useNavigate();
  const disconnectSource = (source) => {
    setConnectedSources(connectedSources.filter((s) => s !== source));
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <p className="settings-subtitle">
        Manage your profile, connected sources, and basic notification
        preferences.
      </p>

      <section className="settings-section">
        <h4>Profile</h4>
        <div className="settings-profile">
          <div className="avatar-circle">JS</div>
          <div className="settings-profile-fields">
            <div className="field-row">
              <span>Name</span>
              <span>Jessica Shen</span>
              <button className="field-edit">Modify</button>
            </div>
            <div className="field-row">
              <span>Phone</span>
              <span>+1 (555) 123-4567</span>
              <button className="field-edit">Modify</button>
            </div>
            <div className="field-row">
              <span>Email</span>
              <span>jessica.shen@example.com</span>
              <button className="field-edit">Modify</button>
            </div>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h4>Connected sources</h4>
        {connectedSources.length === 0 ? (
          <button
            type="button"
            className="settings-empty-link"
            onClick={() => navigate("/connect")}
          >
            No sources connected. Click here to connect sources.
          </button>
        ) : (
          <ul className="sources-list">
            {connectedSources.map((source) => (
              <li key={source} className="source-row">
                <span>{source}</span>
                <button
                  className="secondary-button"
                  onClick={() => disconnectSource(source)}
                >
                  Disconnect
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="settings-section">
        <h4>Notification preferences</h4>
        <p className="settings-note">
          For this prototype, notifications are simulated. Reminders will appear
          in the Alerts view.
        </p>
      </section>
    </div>
  );
}

export default SettingsPage;

