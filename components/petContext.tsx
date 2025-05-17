import React, { createContext, useState, useContext, ReactNode } from 'react';


type PetContextType = {
 selectedPet: string | null;
 petName: string;
 setSelectedPet: (pet: string) => void;
 setPetName: (name: string) => void;
};


const PetContext = createContext<PetContextType>({
 selectedPet: null,
 petName: '',
 setSelectedPet: () => {},
 setPetName: () => {},
});


export const PetProvider = ({ children }: { children: ReactNode }) => {
 const [selectedPet, setSelectedPet] = useState<string | null>(null);
 const [petName, setPetName] = useState<string>('');


 return (
   <PetContext.Provider value={{ selectedPet, petName, setSelectedPet, setPetName }}>
     {children}
   </PetContext.Provider>
 );
};


export const usePet = () => useContext(PetContext); 