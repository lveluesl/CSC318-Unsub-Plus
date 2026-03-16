import React, { useCallback, useMemo, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import OnboardingPage from "./pages/OnboardingPage";
import ConnectSourcesPage from "./pages/ConnectSourcesPage";
import ScanningPage from "./pages/ScanningPage";
import DashboardPage from "./pages/DashboardPage";
import SubscriptionDetailPage from "./pages/SubscriptionDetailPage";
import ReminderSettingsPage from "./pages/ReminderSettingsPage";
import CancellationOptionsPage from "./pages/CancellationOptionsPage";
import CancellationConfirmPage from "./pages/CancellationConfirmPage";
import AlertsPage from "./pages/AlertsPage";
import SettingsPage from "./pages/SettingsPage";
import initialSubscriptions from "./data/subscriptions";

function App() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [connectedSources, setConnectedSourcesState] = useState(() => {
    try {
      const saved = localStorage.getItem("unsub_connected_sources");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const setConnectedSources = useCallback((newValue) => {
    setConnectedSourcesState(newValue);
    try {
      localStorage.setItem("unsub_connected_sources", JSON.stringify(newValue));
    } catch (_) {}
  }, []);

  const ensureSubscriptionsLoaded = useCallback(() => {
    setSubscriptions((prev) =>
      prev.length === 0 ? initialSubscriptions : prev
    );
  }, []);

  const updateSubscription = useCallback((id, updates) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))
    );
  }, []);

  const filteredSubscriptions = useMemo(() => {
    if (connectedSources.length === 0) return [];
    return subscriptions.filter((sub) =>
      connectedSources.includes(sub.source)
    );
  }, [subscriptions, connectedSources]);

  const location = useLocation();
  const hideNav =
    location.pathname === "/" ||
    location.pathname === "/connect" ||
    location.pathname === "/scanning";

  return (
    <Layout hideNav={hideNav}>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route
          path="/connect"
          element={
            <ConnectSourcesPage
              connectedSources={connectedSources}
              setConnectedSources={setConnectedSources}
            />
          }
        />
        <Route
          path="/scanning"
          element={
            <ScanningPage ensureSubscriptionsLoaded={ensureSubscriptionsLoaded} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              subscriptions={filteredSubscriptions}
              updateSubscription={updateSubscription}
            />
          }
        />
        <Route
          path="/subscription/:id"
          element={
            <SubscriptionDetailPage subscriptions={filteredSubscriptions} />
          }
        />
        <Route
          path="/subscription/:id/reminder"
          element={
            <ReminderSettingsPage
              subscriptions={filteredSubscriptions}
              updateSubscription={updateSubscription}
            />
          }
        />
        <Route
          path="/subscription/:id/cancel"
          element={
            <CancellationOptionsPage subscriptions={filteredSubscriptions} />
          }
        />
        <Route
          path="/subscription/:id/cancel/confirm"
          element={
            <CancellationConfirmPage
              subscriptions={filteredSubscriptions}
              updateSubscription={updateSubscription}
            />
          }
        />
        <Route
          path="/alerts"
          element={<AlertsPage subscriptions={filteredSubscriptions} />}
        />
        <Route
          path="/settings"
          element={
            <SettingsPage
              connectedSources={connectedSources}
              setConnectedSources={setConnectedSources}
            />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;

