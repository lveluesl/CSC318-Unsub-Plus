import React from "react";
import { useNavigate } from "react-router-dom";
import "./OnboardingPage.css";

function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="onboarding">
      <section className="onboarding-hero">
        <h1 className="onboarding-title">Unsub+</h1>
        <p className="onboarding-tagline">See. Control. Cancel.</p>
        <p className="onboarding-subtitle">
          Track every recurring charge in one calm, focused dashboard.
        </p>
        <button className="primary-button" onClick={() => navigate("/connect")}>
          Connect your subscriptions
        </button>
        <p className="onboarding-support">
          We support Apple ID, Google, Credit Cards, and PayPal.
        </p>
      </section>
    </div>
  );
}

export default OnboardingPage;
