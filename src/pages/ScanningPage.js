import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ScanningPage.css";

function ScanningPage({ ensureSubscriptionsLoaded }) {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    ensureSubscriptionsLoaded();

    const steps = [20, 45, 70, 100];
    let stepIndex = 0;

    const interval = setInterval(() => {
      setProgress(steps[stepIndex]);
      stepIndex += 1;
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/dashboard");
        }, 600);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [ensureSubscriptionsLoaded, navigate]);

  return (
    <div className="scanning">
      <button
        className="secondary-button scanning-back"
        onClick={() => navigate("/connect")}
      >
        ← Back to sources
      </button>
      <h2>Importing Subscriptions</h2>
      <p className="scanning-subtitle">
        Scanning your sources and detecting recurring subscriptions…
      </p>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="scan-messages">
        <span>Scanning your sources…</span>
        <span>Detecting recurring subscriptions…</span>
      </div>
    </div>
  );
}

export default ScanningPage;

