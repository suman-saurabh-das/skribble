import { useState } from "react";

// components
import { ScribbleProvider } from "../context/ScribbleContext";
import Sidebar from "../components/sidebar/Sidebar";
import ScribbleContainer from "../components/scribbles/ScribbleContainer";

// types
import type { ScribblesProps } from "../utils/types";

const Scribbles = ({ darkMode, setDarkMode }: ScribblesProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <ScribbleProvider>
      <div className="flex relative text-black dark:text-white">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <div
          className={`transition-all duration-300 ${
            showSidebar ? "xl:ml-80" : "xl:ml-0"
          } w-full`}
        >
          <ScribbleContainer
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </div>
      </div>
    </ScribbleProvider>
  );
};

export default Scribbles;
