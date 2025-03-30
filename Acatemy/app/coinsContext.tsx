import React, { createContext, useState, useContext } from 'react';

type CoinsContextType = {
  coins: number;
  addCoins: (amount: number) => void;
  resetCoins: () => void;
};

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export const CoinsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState(0);

  const addCoins = (amount: number) => {
    setCoins((prevCoins) => prevCoins + amount);
  };

  const resetCoins = () => {
    setCoins(0);
  };

  return (
    <CoinsContext.Provider value={{ coins, addCoins, resetCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
};