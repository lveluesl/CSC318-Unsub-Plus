import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ReminderSettingsPage.css";

const PRESETS = [3, 7, 14];

function ReminderSettingsPage({ subscriptions, updateSubscription }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const subscription = subscriptions.find((s) => s.id === id);

  const [daysBefore, setDaysBefore] = useState(
    subscription?.reminderConfig?.daysBefore || 7
  );
  const [channels, setChannels] = useState(
    subscription?.reminderConfig?.channels || ["push"]
  );
  const [custom, setCustom] = useState(
    PRESETS.includes(daysBefore) ? "" : String(daysBefore)
  );
  const [saved, setSaved] = useState(false);

  if (!subscription) {
    return (
      <div>
        <h2>Reminder Settings</h2>
        <p>Subscription not found.</p>
      </div>
    );
  }

  const toggleChannel = (channel) => {
    setChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const applyPreset = (preset) => {
    setDaysBefore(preset);
    setCustom("");
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;
    setCustom(value);
    const parsed = parseInt(value, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      setDaysBefore(parsed);
    }
  };

  const handleSave = () => {
    updateSubscription(id, {
      hasReminder: true,
      reminderConfig: { daysBefore, channels }
    });
    setSaved(true);
    setTimeout(() => {
      navigate(`/subscription/${id}`);
    }, 800);
  };

  return (
    <div className="reminder">
      <h2>Reminder Settings</h2>
      <p className="reminder-subtitle">When should we notify you?</p>

      <section className="reminder-section">
        <h4>Reminder interval</h4>
        <div className="chip-row">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              className={
                daysBefore === preset ? "chip chip-active" : "chip"
              }
              onClick={() => applyPreset(preset)}
            >
              {preset} days
            </button>
          ))}
          <div className="chip-custom">
            <span>Custom</span>
            <input
              type="number"
              min="1"
              value={custom}
              onChange={handleCustomChange}
            />
            <span className="chip-custom-label">days</span>
          </div>
        </div>
      </section>

      <section className="reminder-section">
        <h4>Notification methods</h4>
        <div className="chip-row">
          {["push", "sms", "email"].map((channel) => (
            <button
              key={channel}
              className={
                channels.includes(channel) ? "chip chip-active" : "chip"
              }
              onClick={() => toggleChannel(channel)}
            >
              {channel.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <div className="reminder-actions">
        <button
          className="secondary-button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button className="primary-button" onClick={handleSave}>
          Save
        </button>
      </div>

      {saved && (
        <p className="reminder-success">Reminder saved for this subscription.</p>
      )}
    </div>
  );
}

export default ReminderSettingsPage;

