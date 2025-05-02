import React, { createContext, useState, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

type CoinsContextType = {
  coins: number;
  setCoins: (amount: number) => void; // <-- Add setCoins to the context type
  addCoins: (amount: number) => void;
  resetCoins: () => void;
  updateCoins: (amount?: number) => void;
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

  const updateCoins = async (amount?: number) => {
    if (amount !== undefined) {
      setCoins(amount);
      return;
    }
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.totalCoins !== undefined) {
            setCoins(data.totalCoins);
            console.log(`Updated global coins state to ${data.totalCoins}`);
          }
        }
      }
    } catch (error) {
      console.error("Error updating coins from Firestore:", error);
    }
  };

  return (
    <CoinsContext.Provider value={{ coins, setCoins, addCoins, resetCoins, updateCoins }}>
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