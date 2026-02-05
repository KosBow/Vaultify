# Vaultify 🧾🔐

> Portfolio project – work in progress

Vaultify is a fullstack application for managing receipts and warranties in a simple, structured way.

The goal is to make it easy to keep track of purchases, warranty periods, and related information – all in one place.

This project is built as a modern portfolio application with a clear separation between backend and frontend, focusing on clean architecture, type safety, and real-world development patterns.

---

## 🚀 Tech Stack

### Backend
- **.NET Web API (C#)**
- **MongoDB**
- DTO-based API design
- Full CRUD operations for receipts
- Swagger for API documentation and testing

### Frontend
- **React + TypeScript**
- **Vite**
- **Axios** (centralized HTTP client)
- Structured API layer (`services`)
- Strong typing via shared DTOs

---

## 📌 Current State

- Backend API is fully implemented and running locally
- Frontend is connected to the real API (no mock data)
- Receipts can be fetched and displayed via typed API calls
- Environment-based configuration is in place

---

## 📁 Project Structure (Frontend)
src/
├── assets/
├── components/
├── hooks/
├── layouts/
├── pages/
├── services/
│ ├── httpClient.ts
│ └── receiptApi.ts
├── types/
│ └── receipt.ts
├── App.tsx
├── main.tsx


- **services/** → API layer (Axios + backend communication)
- **types/** → Shared DTOs (mirrors backend contracts)
- **pages/** → Application screens (routing + data fetching)
- **components/** → Reusable UI building blocks

---

## 🔌 API Integration 

All API communication is handled through a centralized Axios client:

- Base URL configured via environment variables
- Typed requests and responses
- Clean separation between UI and data access

Example:
```ts
const receipts = await receiptApi.getAll();
```

## ⚙️ Environment Variables

Create a .env file in the frontend root:

VITE_API_BASE_URL=https://localhost:xxxx

## 🧠 Purpose of the Project

-Vaultify is designed to demonstrate:

-Real-world fullstack architecture

-Clean API contracts using DTOs

-Type-safe frontend ↔ backend communication

-A scalable structure suitable for future features (authentication, uploads, desktop app)

-Planned next steps

-UI components for listing and managing receipts

-Forms for create/update

-Electron packaging for desktop use

## 🧑‍💻 Author

Khosrat A.
Junior .NET / Fullstack Developer

Portfolio project built with long-term maintainability in mind.