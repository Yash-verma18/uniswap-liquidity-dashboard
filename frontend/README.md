
### **Frontend README**

# **Uniswap Liquidity Dashboard - Frontend**

This is the frontend for the **Uniswap Liquidity Dashboard**. It provides a user-friendly interface for monitoring Uniswap pool liquidity, setting up alerts, and receiving real-time notifications.

---

## **Features**
- **Pool Monitoring**: View top Uniswap pools and their key metrics like liquidity and volume.
- **Real-Time Alerts**: Receive WebSocket-driven alerts for significant liquidity changes.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **Modern UI**: Built with **shadcn/ui** and Tailwind CSS for a sleek and dynamic interface.

---

## **Technologies Used**
- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **shadcn/ui**: Pre-built UI components with full Tailwind CSS customization.
- **Socket.IO Client**: Enables real-time WebSocket communication with the backend.
- **Axios**: HTTP client for making API requests.
- **TypeScript**: Adds type safety to the project.

---

## **Folder Structure**
```plaintext
├── app/
│   ├── context/
│   │   └── SocketProvider.tsx   # Socket.IO context provider
│   └── page.tsx                 # Main application page
├── components/                  # Reusable Shadcn UI components

```

---

## **Setup Instructions**

### **Prerequisites**
- **Node.js** (v16+)
- **Yarn** (preferred)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/Yash-verma18/uniswap-liquidity-dashboard.git
   cd uniswap-liquidity-dashboard/frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

### **Running the Application**
1. Start the development server:
   ```bash
   yarn dev
   ```

2. Open the application in your browser:
   ```
   http://localhost:8000
   ```

### **Building for Production**
1. Build the application:
   ```bash
   yarn build
   ```

2. Start the production server:
   ```bash
   yarn start
   ```

---

## **Key Dependencies**
- **shadcn/ui**: Provides accessible, Tailwind-styled UI components for rapid development.
- **socket.io-client**: For real-time WebSocket communication with the backend.


---

## **Future Enhancements**
- **Expanded Dashboard**:
  - Add visualizations like graphs for historical liquidity data.
- **Alert Management**:
  - Allow users to manage alerts directly from the frontend.
- **User Authentication**:
  - Enable login functionality for personalized alerts.

---
