import { useState } from "react";

// types
import type { Dispatch, SetStateAction } from "react";

// components
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

const Notes = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <div className="flex relative text-black dark:text-white">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`transition-all duration-300 ${
          showSidebar ? "xl:ml-80" : "xl:ml-0"
        } w-full`}
      >
        <Main
          darkMode={darkMode}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          setDarkMode={setDarkMode}
        />
      </div>
    </div>
  );
};

export default Notes;
