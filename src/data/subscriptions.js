const initialSubscriptions = [
  {
    id: "netflix",
    serviceName: "Netflix",
    status: "active",
    renewalDate: "2026-04-10",
    amount: 16.99,
    paymentSource: "Visa •••• 4242",
    owner: "Jessica",
    hasReminder: true,
    reminderConfig: {
      daysBefore: 7,
      channels: ["email"]
    }
  },
  {
    id: "spotify",
    serviceName: "Spotify",
    status: "active",
    renewalDate: "2026-03-28",
    amount: 9.99,
    paymentSource: "Apple ID",
    owner: "Jessica",
    hasReminder: false,
    reminderConfig: null
  },
  {
    id: "notion",
    serviceName: "Notion",
    status: "trial",
    renewalDate: "2026-03-22",
    amount: 8.0,
    paymentSource: "Visa •••• 1111",
    owner: "School",
    hasReminder: true,
    reminderConfig: {
      daysBefore: 3,
      channels: ["push"]
    }
  },
  {
    id: "ubereats",
    serviceName: "Uber Eats Pass",
    status: "trial",
    renewalDate: "2026-03-20",
    amount: 11.99,
    paymentSource: "Visa •••• 4242",
    owner: "Jessica",
    hasReminder: false,
    reminderConfig: null
  },
  {
    id: "icloud",
    serviceName: "iCloud",
    status: "active",
    renewalDate: "2026-04-01",
    amount: 2.99,
    paymentSource: "Apple ID",
    owner: "Family",
    hasReminder: false,
    reminderConfig: null
  },
  {
    id: "ytpremium",
    serviceName: "YouTube Premium",
    status: "cancelled",
    renewalDate: "2026-02-15",
    amount: 13.99,
    paymentSource: "PayPal",
    owner: "Jessica",
    hasReminder: false,
    reminderConfig: null
  },
  {
    id: "adobecc",
    serviceName: "Adobe Creative Cloud",
    status: "active",
    renewalDate: "2026-04-05",
    amount: 29.99,
    paymentSource: "Visa •••• 4242",
    owner: "School",
    hasReminder: true,
    reminderConfig: {
      daysBefore: 14,
      channels: ["email", "push"]
    }
  }
];

export default initialSubscriptions;

