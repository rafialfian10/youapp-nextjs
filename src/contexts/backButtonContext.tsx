"use client";

// BackButtonContext.tsx
import { useState, useContext, createContext } from "react";

interface BackButtonContextProps {
  showBackButton: boolean;
  setShowBackButton: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BackButtonContext = createContext<
  BackButtonContextProps | undefined
>(undefined);

export default function BackButtonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showBackButton, setShowBackButton] = useState(false);

  return (
    <BackButtonContext.Provider value={{ showBackButton, setShowBackButton }}>
      {children}
    </BackButtonContext.Provider>
  );
}

export const useBackButton = () => {
  const context = useContext(BackButtonContext);
  if (!context) {
    throw new Error("useBackButton must be used within a BackButtonProvider");
  }
  return context;
};
