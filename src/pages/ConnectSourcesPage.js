import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConnectSourcesPage.css";

const SOURCES = ["Apple ID", "Google", "Visa", "PayPal"];

function ConnectSourcesPage({ connectedSources, setConnectedSources }) {
  const [selection, setSelection] = useState(connectedSources || []);
  const [showPermission, setShowPermission] = useState(false);
  const [showSelectPrompt, setShowSelectPrompt] = useState(false);
  const navigate = useNavigate();

  const toggleSource = (source) => {
    setSelection((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const handleImportClick = () => {
    if (selection.length === 0) {
      setShowSelectPrompt(true);
      return;
    }
    setShowPermission(true);
  };

  const confirmImport = () => {
    setConnectedSources(selection);
    navigate("/scanning");
  };

  return (
    <div className="connect">
      <button
        className="secondary-button connect-back"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>
      <h2>Connect Sources</h2>
      <p className="connect-instruction">
        Select accounts to import subscriptions.
      </p>
      <div className="source-grid">
        {SOURCES.map((source) => (
          <button
            key={source}
            className={
              selection.includes(source)
                ? "source-chip source-chip-active"
                : "source-chip"
            }
            onClick={() => toggleSource(source)}
          >
            {source}
          </button>
        ))}
      </div>
      <button
        className="primary-button connect-import"
        onClick={handleImportClick}
      >
        Import
      </button>

      {showSelectPrompt && (
        <div className="permission-overlay" onClick={() => setShowSelectPrompt(false)}>
          <div className="permission-card" onClick={(e) => e.stopPropagation()}>
            <h3>Select a source</h3>
            <p>Please select at least one source to import subscriptions.</p>
            <div className="permission-actions">
              <button
                className="primary-button"
                onClick={() => setShowSelectPrompt(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showPermission && (
        <div className="permission-overlay">
          <div className="permission-card">
            <h3>Read-only access</h3>
            <p>
              Unsub+ uses read-only connections to detect active and trial
              subscriptions. We never modify or cancel anything without you
              confirming first.
            </p>
            <div className="permission-actions">
              <button
                className="secondary-button"
                onClick={() => setShowPermission(false)}
              >
                Cancel
              </button>
              <button className="primary-button" onClick={confirmImport}>
                Continue to import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectSourcesPage;

