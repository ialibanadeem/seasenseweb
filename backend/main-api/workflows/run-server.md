---
description: how to run the SeaSense AI server and dashboard
---

// turbo-all
1. Clear the Dashboard port (3001) if it's already in use:
   `Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process -Force`

2. Start the Dashboard (Frontend):
   - Move to the dashboard directory: `cd e:/App/SeaSense-AI-dev/dashboard`
   - Run the development server: `npm run dev`

3. Start the Backend (API):
   - Open a new terminal.
   - Move to the root directory: `cd e:/App/SeaSense-AI-dev`
   - Run the development server: `npm run start:dev`

4. Verify status:
   - Dashboard: http://localhost:3001
   - Backend API: http://localhost:3000
