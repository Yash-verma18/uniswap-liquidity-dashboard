```markdown

## Overview
Created an MVP for liquidity Monitoring and setting up alerts for different pools. It consists of a **frontend** and a **backend**, each with its own functionality and setup.

### Features
- Getting Top Pools from Uniswap Subgraph
- Making Liquidity Alerts based on Liquidity Changes and User-Defined Thresholds
- Database Models for Alerts and Liquidity Tracking
- Real-time Notifications via WebSockets

## Folder Structure
```plaintext
├── backend/        # Backend application (Node.js, Express)
├── frontend/       # Frontend application (React, Next.js)
├── README.md       # Root README with project overview

```

## Setup
This project has two main parts:
1. [Backend](./backend/README.md)
2. [Frontend](./frontend/README.md)


### Installation
#### 1. Clone the Repository
```bash
git clone https://github.com/Yash-verma18/uniswap-liquidity-dashboard
cd uniswap-liquidity-dashboard
```

#### 2. Install Dependencies
Install the dependencies for both frontend and backend:

```bash
cd backend
yarn install
cd ../frontend
yarn install
```

#### 3. Start Applications
- **Backend**:
  ```bash
  cd backend
  yarn start
  ```

- **Frontend**:
  ```bash
  cd frontend
  yarn dev
  ```

- Access the frontend at (http://localhost:8000).
- Access the backend at (http://localhost:3000).


## **Future Enhancements**

### **Protocol-Agnostic Solution**
If I try to focus on a protocol-agnostic solution—meaning having all pools from every protocol—I have two options:

#### Option 1: Using Different Subgraphs from The Graph
Currently, I am using the Uniswap V3 Subgraph to retrieve pool information. Similarly, I can select subgraphs for other DEXs like SushiSwap, Balancer, Curve, etc. 

Once I identify the appropriate subgraphs for each protocol, I can programmatically query them and combine the results.

#### Example Workflow:
- Query multiple subgraphs (e.g., Uniswap, SushiSwap, Balancer).
- Extract relevant data (e.g., pool IDs, tokens, TVL).
- Merge the data into a unified format.

This is the first approach I considered to integrate different protocols into our app. However, one important consideration is that we need to write queries for each protocol individually. 

#### Option 2: Using Tools Like DefiLlama API
To avoid writing queries for every protocol, I can use other tools like the **DefiLlama API** ([documentation](https://defillama.com/docs/api)). This API provides unified pool data across multiple protocols.

### **Advance Features**
If i had more time, I would implement user login functionality. This would allow users to create and manage their alerts.

1. **User Registration**: Users can create accounts by providing their email and password.
2. **User Login**: Users can log in using their credentials.
3. **Alert Management**: Users can create, edit, and delete alerts.
4. **Authentication**: Implement secure authentication mechanisms to protect user data.
5. **Unit Testing**: Write unit tests to ensure the functionality of the user login and alert management features.
6. **Scalability**: Ensure the application can handle a large number of users and alerts.
   1. **Could focus on Caching**: Caching the API responses can significantly improve the performance of the application.
   2. **Rate Limiting**: Implement rate limiting to prevent abuse and ensure fair usage.
   3. **Database Optimization**: Optimize the database schema and queries to handle large amounts of data efficiently.
   4. **Load Balancing**: Use load balancers to distribute incoming requests across multiple servers.
   5. **Observability & Anamoly detection**: Set up monitoring tools to track the performance and health of the application.
   6. **Access Patterns**: Analyze access patterns and request  paths to identify hotspots and optimize the application accordingly.
   7. **Security**: Implement security measures like input validation, secure communication, and regular security audits, firwalls, and encryption.
   8. **Logging & Monitoring** 
   9. **Hybrid Approach of Horizontal and Vertical Scaling**


### Alert Workflow
![alt text](image.png)


```

---

