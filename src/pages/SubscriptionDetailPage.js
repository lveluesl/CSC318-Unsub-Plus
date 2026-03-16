import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SubscriptionDetailPage.css";

function SubscriptionDetailPage({ subscriptions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const subscription = subscriptions.find((s) => s.id === id);

  if (!subscription) {
    return (
      <div>
        <h2>Subscription not found</h2>
        <button className="primary-button" onClick={() => navigate("/dashboard")}>
          Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="sub-detail">
      <h2>{subscription.serviceName}</h2>
      <p className="sub-detail-status">
        Status: <strong>{subscription.status}</strong>
      </p>
      <div className="sub-detail-grid">
        <div>
          <h4>Amount</h4>
          <p>${subscription.amount.toFixed(2)} / month</p>
        </div>
        <div>
          <h4>Renewal date</h4>
          <p>{new Date(subscription.renewalDate).toLocaleDateString()}</p>
        </div>
        <div>
          <h4>Payment source</h4>
          <p>{subscription.paymentSource}</p>
        </div>
        <div>
          <h4>Owner</h4>
          <p>{subscription.owner}</p>
        </div>
        <div>
          <h4>Reminder</h4>
          <p>
            {subscription.hasReminder
              ? `On · ${subscription.reminderConfig.daysBefore} days before via ${subscription.reminderConfig.channels.join(
                  ", "
                )}`
              : "None set"}
          </p>
        </div>
      </div>
      <div className="sub-detail-actions">
        <button
          className="secondary-button"
          onClick={() => navigate(`/subscription/${id}/reminder`)}
        >
          Set Reminder
        </button>
        <button
          className="primary-button"
          onClick={() => navigate(`/subscription/${id}/cancel`)}
        >
          Cancel Subscription
        </button>
      </div>
    </div>
  );
}

export default SubscriptionDetailPage;

