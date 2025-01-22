'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface alertEvent {
  poolAddress: string;
  percentageDrop: number;
  currentLiquidity: string;
}

interface ISocketContext {
  alertEvents: alertEvent[];
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [alertEvents, setAlertEvents] = useState<alertEvent[]>([]);

  useEffect(() => {
    const _socket = io('http://localhost:3000'); // Backend URL

    _socket.on('connect', () => {
      console.log('Connected to socket:', _socket.id);
    });

    _socket.on('event:alert', (data: alertEvent) => {
      console.log('Alert Event Received:', data);
      setAlertEvents((prev) => [...prev, data]); // Store the serialized data
    });

    _socket.on('disconnect', () => {
      console.log('Disconnected from swap socket');
    });

    setSocket(_socket);

    return () => {
      _socket.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ alertEvents }}>
      {children}
    </SocketContext.Provider>
  );
};
