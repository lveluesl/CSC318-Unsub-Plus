import React from "react";
import "./AlertsPage.css";

function AlertsPage({ subscriptions }) {
  const withReminders = subscriptions.filter((s) => s.hasReminder);

  return (
    <div className="alerts">
      <h2>Alerts</h2>
      <p className="alerts-subtitle">
        Overview of active reminders and upcoming renewals.
      </p>
      {withReminders.length === 0 ? (
        <div className="alerts-empty">
          <h3>No reminders yet</h3>
          <p>
            Set reminders from any subscription to get notified before the next
            billing date.
          </p>
        </div>
      ) : (
        <div className="alerts-list">
          {withReminders.map((sub) => (
            <div key={sub.id} className="alert-card">
              <div>
                <div className="alert-name">{sub.serviceName}</div>
                <div className="alert-status">
                  Reminder {sub.reminderConfig.daysBefore} days before via{" "}
                  {sub.reminderConfig.channels.join(", ")}
                </div>
              </div>
              <div className="alert-meta">
                <span>
                  Renews {new Date(sub.renewalDate).toLocaleDateString()}
                </span>
                <span>${sub.amount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlertsPage;

