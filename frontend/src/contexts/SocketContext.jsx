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
    // Determine socket base URL: prefer VITE_SOCKET_URL; else derive from VITE_API_URL by stripping trailing /api
    const apiUrl = import.meta.env.VITE_API_URL;
    const derivedSocketUrl = apiUrl && apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
    const socketUrl = import.meta.env.VITE_SOCKET_URL || derivedSocketUrl || 'https://bullgains-research.onrender.com';

    // Initialize socket connection
    const newSocket = io(socketUrl, {
      auth: {
        token: token
      }
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });

    // Listen for real-time market data
    newSocket.on('market-update', (data) => {
      setMarketData(data);
    });

    // Listen for portfolio updates (for authenticated users)
    newSocket.on('portfolio-update', (data) => {
      console.log('Portfolio update received:', data);
      // Handle portfolio updates here
    });

    // Listen for research reports updates
    newSocket.on('research-update', (data) => {
      console.log('Research update received:', data);
      // Handle research updates here
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, [token]);

  // Emit events
  const emitEvent = (eventName, data) => {
    if (socket && isConnected) {
      socket.emit(eventName, data);
    }
  };

  // Join specific rooms for real-time updates
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

  // Subscribe to market data
  const subscribeToMarket = () => {
    if (socket && isConnected) {
      socket.emit('subscribe-market');
    }
  };

  // Unsubscribe from market data
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
    unsubscribeFromMarket
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

