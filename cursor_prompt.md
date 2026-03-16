Build a frontend-only React web app called Unsub+, a subscription management tool that helps users track, manage, and cancel digital subscriptions.
This is a high-fidelity interactive prototype, not a production app.Use React + JavaScript (.js only, no .jsx) and React Router.
I want you to implement the project file by file, with clear structure, mock data, local state, and polished but simple styling.

Tech requirements

- Use React
- Use JavaScript only (.js, not .jsx)
- Use React Router DOM
- Use functional components + hooks
- Use plain CSS
- No backend
- No database
- No auth
- Use mock local data
- Make it runnable with normal React commands

This app helps users:

1. Monthly Audit: Users connect subscription sources and review subscriptions in a unified dashboard.
2. Trial Reminder Setup: Users set reminders before free trials convert into paid subscriptions.
3. Cancel Fast: Users access the correct cancellation flow and can cancel safely.

Page 1 — Onboarding / Connect Sources
App name at top: “Unsub+”
Tagline: “See. Control. Cancel.”
Button: “Connect your subscriptions”
Small text: “We support Apple ID, Google, Credit Cards”
Route:

- /

Page 2 — Source Picker
Purpose: User selects data sources.
Title: “Connect Sources”
Instruction text: “Select accounts to import subscriptions”
Elements:

- buttons for:
  _ Apple ID
  _ Google
  _ Visa
  _ PayPal
  Bottom: “Import” button
  Behavior:
- Selecting sources updates local state
- Clicking import goes to scanning page
- Before scanning, show a permission explanation panel/modal \* Ex. “Read-only access used to detect subscriptions”
  Route:
- /connect

Page 3 — Scanning / Importing
Purpose: Simulate importing subscription data
Title: “Importing Subscriptions”
Elements:

- Progress indicator / progress bar
- Text such as:
  _ “Scanning your sources…”
  _ “Detecting recurring subscriptions…”
  Behavior:
- After short simulated delay, navigate to dashboard
- Populate dashboard with mock subscription data
  Route:
- /scanning

Page 4 — Dashboard
Top bar: “Dashboard”
Purpose: Centralized subscription overview
Elements:

- List showing subscriptions with:
  - service name
  - status: active, trial, canceled
  - renewal date
  - amount
- Filters:
  - by status
  - by renewal time
  - by amount
- Quick actions for each subscription:
  _ View Details
  _ Set Reminder
  _ Cancel
  _ Hide: after hide all, show "No subscription found"
  Behavior:
- Hidden subscriptions should disappear from main list
- Quick actions should navigate properly or update state

Route:

- /dashboard

Page 5 — Subscription Detail Page
Purpose: Central action hub for one subscription
Elements:

- service name
- status
- amount
- renewal date
- payment source
- owner tag, which can be customized
- reminder status
- buttons:
  _ Set Reminder
  _ Cancel Subscription
  Behavior:
- Pull subscription from mock local data/state

Route:

- /subscription/:id

Page 6 — Alerts / Notification Settings
Purpose: Configure reminder before billing
Title: “Reminder Settings”
Text: “When should we notify you?”
Elements:

- Reminder interval buttons:
  - 3 days
  - 7 days
  - 14 days
  - Custom
- Notification methods:
  - Push
  - SMS
  - Email
- Save button
- Back button
  Route:
- /subscription/:id/reminder
  Behavior:
- Save reminder state locally
- Show success confirmation
- Return to detail page or dashboard

Page 7 — Cancellation Page
Purpose: Let users choose how to cancel
Title: “Cancel Subscription”
Text: “How would you like to proceed?”
Elements:

- Two options:
  - Open Cancellation Page
  - View Step-by-Step Guide
- Back button
  Route:
- /subscription/:id/cancel
  Behavior:
- Opening cancellation page goes to simulated external cancellation page
- Step-by-step guide can be a simple cancel steps text pop up

Page 8 — Simulated App Store Cancellation Page
Purpose: Simulate service cancellation interface
Elements:

- Service info
- Current plan
- Renewal info
- Warning / confirmation text
- Confirm cancellation button
- Back button
  Route:
- /subscription/:id/cancel/confirm
  Behavior:
- Clicking confirm opens confirmation dialog first
- After confirm:
  - mark subscription status as cancelled
  - show success message
  - show Undo action temporarily
- Then return to detail or dashboard with updated status

Page 9 — Alerts Overview Page
Purpose:

- Overview of active reminders / upcoming renewals
  Elements:
- List of reminders
- Upcoming renewal alerts
- Reminder status
  Route:
- /alerts

Page 10 — Settings Page
Purpose: Manage sources and preferences
Title: “Settings”
Avatar
Name, phone number, email shown with “Modify” icon near each
Elements:

- Connected sources list
- Button to disconnect source
- Basic notification preferences
  Route:
- /settings
  Behavior:
- Disconnecting source updates local state

Mock data
Create realistic mock subscription data such as:

- Netflix
- Spotify
- Notion
- Uber Eats trial
- iCloud
- YouTube Premium
  Each item should include:
- id
- serviceName
- status (active, trial, cancelled, hidden)
- renewalDate
- amount
- paymentSource
- owner
- hasReminder
- reminderConfig
  Use enough data to make the dashboard realistic.

UX / design requirements

- Clean, modern, student-project-friendly UI
- Prioritize clarity and usability
- Strong visual hierarchy
- Consistent top nav or bottom nav
- Desktop web layout, but keep components responsive
- Add meaningful empty states and confirmation states
- Avoid unnecessary complexity
  Key UX details
- Dashboard should feel like the main control surface
- Source connection should clearly communicate privacy and control
- Cancellation flow should feel safe and reversible
- Reminder flow should feel easy and proactive

File structure
Use a clear structure like:

- src/pages/
- src/components/
- src/data/
- src/styles/
- src/App.js
- src/index.js
  Use .js files throughout.

Code quality requirements

- Keep code modular
- Use readable naming
- Add comments where useful
- Avoid overengineering
- Make the app easy for me to edit later

What I want you to output

1. Implement all frontend pages and routing
2. Add mock data and local state management
3. Add clean styling
4. Make the prototype runnable
5. At the end, give me:

- a short summary of what was built
- the file structure
- commands to run locally
- any notes about assumptions you made
  If something is ambiguous, choose the simplest reasonable implementation that best supports the three core tasks above.
