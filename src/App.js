import React, { useCallback, useState } from "react";
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
  const [subscriptions, setSubscriptions] = useState([]);
  const [connectedSources, setConnectedSources] = useState([]);

  const ensureSubscriptionsLoaded = useCallback(() => {
    if (subscriptions.length === 0) {
      setSubscriptions(initialSubscriptions);
    }
  }, [subscriptions.length]);

  const updateSubscription = useCallback((id, updates) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))
    );
  }, []);

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
              subscriptions={subscriptions}
              updateSubscription={updateSubscription}
            />
          }
        />
        <Route
          path="/subscription/:id"
          element={<SubscriptionDetailPage subscriptions={subscriptions} />}
        />
        <Route
          path="/subscription/:id/reminder"
          element={
            <ReminderSettingsPage
              subscriptions={subscriptions}
              updateSubscription={updateSubscription}
            />
          }
        />
        <Route
          path="/subscription/:id/cancel"
          element={<CancellationOptionsPage subscriptions={subscriptions} />}
        />
        <Route
          path="/subscription/:id/cancel/confirm"
          element={
            <CancellationConfirmPage
              subscriptions={subscriptions}
              updateSubscription={updateSubscription}
            />
          }
        />
        <Route
          path="/alerts"
          element={<AlertsPage subscriptions={subscriptions} />}
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

