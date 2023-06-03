import React, { createContext, useContext } from 'react';

const WebSocketContext = createContext({});

const WebSocketProvider = ({ api, children }) => (
  <WebSocketContext.Provider value={api}>
    {children}
  </WebSocketContext.Provider>
);

const useWebSocket = () => useContext(WebSocketContext);

export { useWebSocket };
export default WebSocketProvider;
