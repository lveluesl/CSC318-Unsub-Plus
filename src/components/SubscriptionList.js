import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubscriptionList.css";

function SubscriptionList({ subscriptions, updateSubscription }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("renewal");
  const navigate = useNavigate();

  const visibleSubscriptions = useMemo(() => {
    let list = subscriptions.filter((s) => s.status !== "hidden");

    if (statusFilter !== "all") {
      list = list.filter((s) => s.status === statusFilter);
    }

    if (sortBy === "renewal") {
      list = [...list].sort(
        (a, b) =>
          new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime()
      );
    } else if (sortBy === "amount") {
      list = [...list].sort((a, b) => b.amount - a.amount);
    }

    return list;
  }, [subscriptions, statusFilter, sortBy]);

  const hideSubscription = (id) => {
    updateSubscription(id, { status: "hidden" });
  };

  const isEmpty = visibleSubscriptions.length === 0;

  return (
    <div className="subs">
      <div className="subs-toolbar">
        <div className="toolbar-group">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="trial">Trials</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="toolbar-group">
          <label>Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="renewal">Renewal date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>

      {isEmpty ? (
        <div className="subs-empty">
          <h3>No subscription found</h3>
          <p>
            You may have hidden or cancelled everything. Adjust filters or
            reconnect sources in Settings.
          </p>
        </div>
      ) : (
        <div className="subs-list">
          {visibleSubscriptions.map((sub) => (
            <div key={sub.id} className="sub-card">
              <div className="sub-main">
                <div>
                  <div className="sub-name">{sub.serviceName}</div>
                  <div className="sub-badges">
                    <span className={`sub-status sub-status-${sub.status}`}>
                      {sub.status}
                    </span>
                    {sub.hasReminder && sub.reminderConfig && (
                      <span className="sub-reminder-badge" title={`Reminder ${sub.reminderConfig.daysBefore} days before via ${sub.reminderConfig.channels.join(", ")}`}>
                        Reminder {sub.reminderConfig.daysBefore}d
                      </span>
                    )}
                  </div>
                </div>
                <div className="sub-money">
                  <span className="sub-amount">
                    ${sub.amount.toFixed(2)}
                  </span>
                  <span className="sub-renewal">
                    Renews {new Date(sub.renewalDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="sub-footer">
                <span className="sub-meta">
                  {sub.paymentSource} · Owner: {sub.owner}
                </span>
                <div className="sub-actions">
                  <button
                    className="link-button"
                    onClick={() => navigate(`/subscription/${sub.id}`)}
                  >
                    View details
                  </button>
                  <button
                    className="link-button"
                    onClick={() =>
                      navigate(`/subscription/${sub.id}/reminder`)
                    }
                  >
                    Set reminder
                  </button>
                  <button
                    className="link-button"
                    onClick={() => navigate(`/subscription/${sub.id}/cancel`)}
                  >
                    Cancel
                  </button>
                  <button
                    className="link-button sub-hide"
                    onClick={() => hideSubscription(sub.id)}
                  >
                    Hide
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubscriptionList;

