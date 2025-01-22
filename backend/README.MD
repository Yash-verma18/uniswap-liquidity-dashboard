### **Backend README**

```markdown
# Backend - Liquidity Dashboard

This is the backend service for the Liquidity Dashboard. It handles data fetching, alert management, and real-time notifications for monitoring liquidity changes in Uniswap pools.

## Features
- **GraphQL Queries**: Fetch top Uniswap pools using Uniswap Subgraph.
- **Liquidity Alerts**: Monitor liquidity drops based on user-configured thresholds.
- **Database Models**:
  - `Alert`: Stores user-defined alerts.
  - `Liquidity`: Tracks pool liquidity over time.
- **WebSocket Notifications**: Sends real-time alerts to the frontend based on user custom alerts.

## Folder Structure
```src/
├── graphql-queries   # Contains GraphQL queries for fetching Uniswap data
│   └── getTopPools.ts
├── models            # Mongoose models for database entities
│   ├── Alert.ts
│   └── Liquidity.ts
├── routes            # Express routes for API endpoints
│   └── general.routes.ts
├── service           # Service layer for business logic
│   ├── alert         # Handles alert-related operations
│   │   └── index.ts
│   ├── db            # Database connection logic
│   │   └── index.ts
│   ├── helper        # Utility functions
│   │   └── index.ts
│   └── uniswap       # Uniswap-related business logic
│       └── index.ts
└── index.ts          # Entry point for the backend server
``

## Setup Instructions

### Prerequisites
- **Node.js** (v16+)
- **MongoDB**

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   yarn 
   ```

3. Set up the `.env` file:
   Create a `.env` file in the backend directory and add the following:
   ```env
   RPC_URL=<YOUR_ETHEREUM_RPC_URL>
   MONGO_PASSWORD=<YOUR_MONGO_DATABASE_PASSWORD> 
   UNISWAP_API_KEY=<YOUR_UNISWAP_API_KEY>
   SUBGRAPH_ID=5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV
   PORT=3000
   ```

4. Start the server:
   ```bash
   yarn start
   ```

---

## API Endpoints
- **`GET /api/pools`**: Fetch top Uniswap pools by total value locked (TVL).
- **`POST /api/alerts`**: Create a new alert for liquidity monitoring.

---

## Technologies Used
- **Node.js**: Backend runtime
- **Express**: Web framework
- **TypeScript**: Type-safe development
- **Mongoose**: MongoDB object modeling
- **ethers.js**: Blockchain interaction
- **graphql-request**: Lightweight client for making GraphQL API requests.
- **Socket IO**: Enables real-time, bidirectional communication between the server and clients.
---

## Alert System Workflow
![alt text](image.png)