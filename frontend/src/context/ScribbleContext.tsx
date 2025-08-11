import axios from "axios";
import { useUser } from "./UserContext";
import { createContext, useState, useEffect, useContext } from "react";
// types
import type { ScribbleData, ScribbleContext } from "../utils/types";

const ScribbleContext = createContext<ScribbleContext | undefined>(undefined);

export const ScribbleContextProvider = ({children}: {children: React.ReactNode}) => {
  const [scribbles, setScribbles] = useState<ScribbleData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  // userInfo is used to get currently logged in user token
  // token is used for authorization & making API calls
  const { userInfo } = useUser();

  // Fetch all scribbles from the api and store it in a state variable
  const fetchData = async () => {
    // Proxy needs to be configured to prevent CORS error
    // In Vite, the proxy setting needs to be configured in vite.config.ts file
    try {
      setIsLoading(true);
      // Using the token from userInfo to validate user and make API calls
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const res = await axios.get("https://skribble-api.onrender.com/api/scribbles", config);
      if (res.data) {
        // console.log("FETCH ALL SCRIBBLES :", res.data);
        setScribbles(res.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || error.message)
      }
      setError("Oops! Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the data only if userInfo from UserContext is not null
    // i.e. user must be loggedIn in order to fetch the data
    if (userInfo) {
      fetchData();
    }
  }, [userInfo]);

  return (
    <ScribbleContext.Provider value={{ isLoading, error, scribbles, setScribbles }}>
      {children}
    </ScribbleContext.Provider>
  );
};

// Custom hook to get data using context
export const useScribble = () => {
  const context = useContext(ScribbleContext);
  if (!context) {
    throw new Error("useScribble must be used within a ScribbleProvider");
  }
  return context;
};
