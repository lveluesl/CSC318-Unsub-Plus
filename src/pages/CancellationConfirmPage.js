import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CancellationConfirmPage.css";

function CancellationConfirmPage({ subscriptions, updateSubscription }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const subscription = subscriptions.find((s) => s.id === id);
  const [justCancelled, setJustCancelled] = useState(false);
  const [previousStatus, setPreviousStatus] = useState(
    subscription?.status || "active"
  );

  if (!subscription) {
    return (
      <div>
        <h2>Cancel Subscription</h2>
        <p>Subscription not found.</p>
      </div>
    );
  }

  const handleConfirm = () => {
    const ok = window.confirm(
      `Confirm cancelling ${subscription.serviceName}?`
    );
    if (!ok) return;

    setPreviousStatus(subscription.status);
    updateSubscription(id, { status: "cancelled" });
    setJustCancelled(true);
    setTimeout(() => {
      navigate(`/subscription/${id}`);
    }, 1200);
  };

  const handleUndo = () => {
    updateSubscription(id, { status: previousStatus });
    setJustCancelled(false);
  };

  return (
    <div className="cancel-confirm">
      <h2>Simulated Cancellation Page</h2>
      <p className="cancel-confirm-subtitle">
        Review the plan details before confirming.
      </p>
      <div className="cancel-confirm-card">
        <h3>{subscription.serviceName}</h3>
        <p>Current plan: Monthly</p>
        <p>
          Renews on{" "}
          {new Date(subscription.renewalDate).toLocaleDateString()} for $
          {subscription.amount.toFixed(2)}
        </p>
        <p className="cancel-warning">
          Cancelling now will stop future renewals. You can continue using the
          service until the end of the current billing period.
        </p>
        <div className="cancel-actions">
          <button className="secondary-button" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="primary-button" onClick={handleConfirm}>
            Confirm cancellation
          </button>
        </div>
        {justCancelled && (
          <div className="cancel-success">
            <span>Subscription marked as cancelled.</span>
            <button className="link-button" onClick={handleUndo}>
              Undo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CancellationConfirmPage;

