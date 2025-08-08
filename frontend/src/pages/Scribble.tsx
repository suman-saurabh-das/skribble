import { useState } from "react";
// components
import Sidebar from "../components/sidebar/Sidebar";
import ScribbleContainer from "../components/scribble/ScribbleContainer";
import ModalDeleteScribble from "../components/common/DeleteScribbleModal";
// types
import type { ScribblePageProps } from "../utils/types";

const Scribbles = ({ darkMode, setDarkMode }: ScribblePageProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(window.innerWidth < 640 ? false : true);
  const [deleteScribbleId, setDeleteScribbleId] = useState<string>("");

  return (
    <div className="relative">
      {deleteScribbleId && (
        <ModalDeleteScribble deleteScribbleId={deleteScribbleId} setDeleteScribbleId={setDeleteScribbleId} />
      )}
      <div className="flex relative text-black dark:text-white">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          setDeleteScribbleId={setDeleteScribbleId}
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
    </div>
  );
};

export default Scribbles;
