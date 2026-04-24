# Vaultify – Your Receipt Vault

A fullstack desktop app for storing receipts and tracking warranty expiry dates — built with React, .NET and MongoDB, packaged as an Electron desktop application.

---

## Features

- Add receipts with image upload, price, store, category and warranty duration
- Automatic warranty status tracking — Active, Expiring soon, Expired
- Dashboard with live stats, filters, sorting and search
- Notification panel with per-item and clear-all dismiss (persisted across sessions)
- Full Swedish / English i18n support
- Dark and light mode
- Inline delete confirmation — no browser dialogs
- Toast feedback on all user actions
- Packaged as a native Windows desktop app via Electron

---

## Tech Stack

**Frontend**
- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Lucide icons
- Axios with global error interceptor
- Electron + electron-builder

**Backend**
- .NET 9 Web API (C#)
- MongoDB
- Global exception middleware
- Swagger / OpenAPI

---

## Project Structure

```
receipt-warranty-manager/
├── backend/
│   └── Vaultify.Api/
│       ├── Controllers/
│       ├── Middleware/
│       ├── Models/
│       ├── Services/
│       └── Program.cs
└── frontend/
    └── vaultify-frontend/
        ├── electron/          # Electron main process + preload
        ├── src/
        │   ├── components/
        │   ├── hooks/
        │   ├── i18n/
        │   ├── services/
        │   ├── types/
        │   └── utils/
        └── tsconfig.electron.json
```

---

## Getting Started

**1. Start MongoDB**
```bash
mongod
```

**2. Start the backend**
```bash
cd backend/Vaultify.Api
dotnet run
```

**3. Start the frontend (browser)**
```bash
cd frontend/vaultify-frontend
npm install
npm run dev
```

**4. Or run as Electron desktop app**
```bash
cd frontend/vaultify-frontend
npm run electron:dev
```

**5. Build Windows installer**
```bash
npm run electron:build
```
Output: `frontend/vaultify-frontend/release/`

---

## Status

Complete and working as a local desktop application. Authentication and cloud deployment are out of scope for this version — the focus is on demonstrating fullstack architecture, clean component design and desktop packaging.