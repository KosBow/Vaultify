# Vaultify – Receipt & Warranty Manager

Vaultify is a fullstack application for managing receipts and warranty information in a simple, structured way.

The project is built to demonstrate clean architecture, clear separation of concerns, and real-world backend/frontend communication.

---

## ✨ Features

- Create, update and view receipts
- Warranty tracking with end-date calculation
- Centralized error handling
- DTO-based API contracts
- MongoDB persistence

---

## 🧱 Tech Stack

### Backend
- .NET Web API (C#)
- MongoDB
- DTO-based architecture
- Global exception handling (middleware)
- Swagger / OpenAPI

### Frontend
- React
- TypeScript
- Axios
- Vite
   
### Desktop (Planned)
- Electron (desktop packaging)

---

## 📁 Project Structure

### Backend

```txt
ReceiptWarranty.Api
├─ Controllers/
├─ Exceptions/
├─ Middleware/
├─ Models/
│  ├─ Entities/
│  ├─ DTOs/
│  └─ Mappers/
├─ Services/
│  └─ MongoDB/
├─ Program.cs
└─ appsettings.json
````

### Frontend

```txt
src/
├─ assets/
├─ components/
├─ hooks/
├─ layouts/
├─ pages/
├─ services/
│  ├─ httpClients/
│  └─ receiptApi.ts
├─ types/
├─ App.tsx
└─ main.tsx
````

🔄 API Flow (Example)

HTTP request received in Controller

Controller delegates logic to Service

Service interacts with MongoDB

Domain model mapped to DTO

DTO returned to frontend

This keeps controllers thin and business logic isolated.

⚠️ Error Handling

All exceptions are handled via a global middleware.
Domain-specific exceptions are translated into appropriate HTTP responses.

This ensures consistent and predictable API behavior.

🔐 Configuration

Environment-specific configuration is handled via appsettings.json.

MongoDB connection settings are isolated in a dedicated configuration class.

## 🚧 Project Status

Vaultify is actively developed with a focus on core receipt and warranty management features.
Planned improvements include desktop packaging with Electron and extended warranty insights.

🚀 Getting Started

### Backend
```txt
dotnet restore
dotnet run
```
### Frontend
```txt
npm install
npm run dev
```
