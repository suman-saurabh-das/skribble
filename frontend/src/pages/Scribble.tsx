import { useState } from "react";
// components
import Sidebar from "../components/sidebar/Sidebar";
import ScribbleContainer from "../components/scribble/ScribbleContainer";
// types
import type { ScribblePageProps } from "../utils/types";

const Scribbles = ({ darkMode, setDarkMode }: ScribblePageProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <div className="flex relative text-black dark:text-white">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
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
  );
};

export default Scribbles;
