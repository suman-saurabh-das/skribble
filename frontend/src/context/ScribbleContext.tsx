import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

// types
import type { scribbleDataType, ScribbleContextType } from "../utils/types";

const ScribbleContext = createContext<ScribbleContextType | undefined>(undefined);

export const ScribbleProvider = ({children}: {children: React.ReactNode}) => {
  const [scribbles, setScribbles] = useState<scribbleDataType[]>([]);

  // Fetch all scribbles from the api and set it in a state variable.
  const fetchData = async () => {
    // Proxy needs to be configured to prevent CORS error.
    // In Vite, the proxy setting needs to be configured in vite.config.ts file.
    try {
      const res = await axios.get("/api/scribbles");
      if (res.data) {
        console.log("FETCH ALL SCRIBBLES :", res.data);
        setScribbles(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch scribbles:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <ScribbleContext.Provider value={{scribbles, setScribbles}}>
    {children}
  </ScribbleContext.Provider>
}

// Custom hook to get data using context.
export const useScribbles = () => {
  const context = useContext(ScribbleContext);
  if (!context) {
    throw new Error("useScribbles must be used within a ScribbleProvider")
  }
  return context;
}
