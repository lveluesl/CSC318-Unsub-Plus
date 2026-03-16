import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CancellationOptionsPage.css";

function CancellationOptionsPage({ subscriptions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const subscription = subscriptions.find((s) => s.id === id);
  const [showGuide, setShowGuide] = useState(false);

  if (!subscription) {
    return (
      <div>
        <h2>Cancel Subscription</h2>
        <p>Subscription not found.</p>
      </div>
    );
  }

  return (
    <div className="cancel-options">
      <h2>Cancel Subscription</h2>
      <p className="cancel-subtitle">
        How would you like to proceed for {subscription.serviceName}?
      </p>
      <div className="cancel-card-list">
        <button
          className="cancel-card"
          onClick={() => navigate(`/subscription/${id}/cancel/confirm`)}
        >
          <h3>Open Cancellation Page</h3>
          <p>
            Jump into a simulated store page that mirrors the real cancellation
            steps.
          </p>
        </button>
        <button
          className="cancel-card"
          onClick={() => setShowGuide(true)}
        >
          <h3>View Step-by-Step Guide</h3>
          <p>
            See a clear checklist of what to tap and where, so you can cancel
            confidently.
          </p>
        </button>
      </div>
      <button className="secondary-button" onClick={() => navigate(-1)}>
        Back
      </button>

      {showGuide && (
        <div className="guide-overlay">
          <div className="guide-card">
            <h3>How to cancel {subscription.serviceName}</h3>
            <ol>
              <li>Open your app store account settings.</li>
              <li>Navigate to Subscriptions.</li>
              <li>Find {subscription.serviceName} in the list.</li>
              <li>Tap “Cancel Subscription”.</li>
              <li>Confirm when prompted and take a screenshot if needed.</li>
            </ol>
            <button
              className="primary-button"
              onClick={() => setShowGuide(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CancellationOptionsPage;

