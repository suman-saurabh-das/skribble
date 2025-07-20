import { createContext, useState, useEffect, useContext } from "react";
// types
import type { userDataType, UserContextType } from "../utils/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<userDataType | null>(null);

  // We are hydrating userInfo from local storage and setting it in context, because when user refreshes the app or re-opens the app without login/registering, then userInfo context is null.
  useEffect(() => {
    // Fetch the userInfo data from local storage and set it in UserContext
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser)); // Set to context
    }
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to get data using context.
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
