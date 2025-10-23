import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [marketData, setMarketData] = useState(null);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    // In development, use relative path so Vite proxy works
    // In production, use absolute URL
    let socketUrl = '/';
    if (import.meta.env.PROD) {
      const apiUrl = import.meta.env.VITE_API_URL;
      const derivedSocketUrl = apiUrl && apiUrl.endsWith('/api') 
        ? apiUrl.slice(0, -4) 
        : apiUrl;
      socketUrl = import.meta.env.VITE_SOCKET_URL || derivedSocketUrl || 'https://bullgains.in';
    }

    const newSocket = io(socketUrl, {
      path: '/socket.io', // Explicitly set path to match Vite proxy
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to Socket.IO server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 Disconnected from Socket.IO server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
      setIsConnected(false);
    });

    newSocket.on('market-update', (data) => {
      setMarketData(data);
    });

    newSocket.on('portfolio-update', (data) => {
      console.log('💼 Portfolio update received:', data);
    });

    newSocket.on('research-update', (data) => {
      console.log('📊 Research update received:', data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [token]);

  const emitEvent = (eventName, data) => {
    if (socket && isConnected) {
      socket.emit(eventName, data);
    }
  };

  const joinRoom = (roomName) => {
    if (socket && isConnected) {
      socket.emit('join-room', roomName);
    }
  };

  const leaveRoom = (roomName) => {
    if (socket && isConnected) {
      socket.emit('leave-room', roomName);
    }
  };

  const subscribeToMarket = () => {
    if (socket && isConnected) {
      socket.emit('subscribe-market');
    }
  };

  const unsubscribeFromMarket = () => {
    if (socket && isConnected) {
      socket.emit('unsubscribe-market');
    }
  };

  const value = {
    socket,
    isConnected,
    marketData,
    emitEvent,
    joinRoom,
    leaveRoom,
    subscribeToMarket,
    unsubscribeFromMarket,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};