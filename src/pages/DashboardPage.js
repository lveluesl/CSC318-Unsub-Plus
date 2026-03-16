import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionList from "../components/SubscriptionList";
import "./DashboardPage.css";

function DashboardPage({ subscriptions, updateSubscription }) {
  const navigate = useNavigate();
  const stats = useMemo(() => {
    const active = subscriptions.filter((s) => s.status === "active").length;
    const trials = subscriptions.filter((s) => s.status === "trial").length;
    const cancelled = subscriptions.filter((s) => s.status === "cancelled").length;
    const monthlyTotal = subscriptions
      .filter((s) => s.status !== "hidden")
      .reduce((sum, sub) => sum + sub.amount, 0);

    return { active, trials, cancelled, monthlyTotal };
  }, [subscriptions]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <div className="dashboard-title-row">
            <h2>Dashboard</h2>
            <button
              className="secondary-button dashboard-connect"
              onClick={() => navigate("/connect")}
            >
              Connect sources
            </button>
          </div>
          <p className="dashboard-subtitle">
            Central overview of your active, trial, and cancelled subscriptions.
          </p>
        </div>
        <div className="dashboard-pills">
          <div className="dash-pill">
            <span>{stats.active}</span>
            <label>Active</label>
          </div>
          <div className="dash-pill">
            <span>{stats.trials}</span>
            <label>Trials</label>
          </div>
          <div className="dash-pill">
            <span>{stats.cancelled}</span>
            <label>Cancelled</label>
          </div>
          <div className="dash-pill dash-pill-strong">
            <span>${stats.monthlyTotal.toFixed(2)}</span>
            <label>Monthly spend</label>
          </div>
        </div>
      </div>
      <SubscriptionList
        subscriptions={subscriptions}
        updateSubscription={updateSubscription}
      />
    </div>
  );
}

export default DashboardPage;

