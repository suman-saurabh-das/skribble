import { useState } from "react";
import { FaRegEdit, FaUserCircle } from "react-icons/fa";
import { GiFeather } from "react-icons/gi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuPanelLeftOpen } from "react-icons/lu";
import { TbBulb } from "react-icons/tb";
import { VscPreview } from "react-icons/vsc";

// components
import ScribbleEdit from "./ScribbleEdit";
import ScribbleCreate from "./ScribbleCreate";
import ScribblePreview from "./ScribblePreview";

// type
import type { Dispatch, SetStateAction } from "react";

const Main = ({
  showSidebar,
  darkMode,
  setShowSidebar,
  setDarkMode,
}: {
  showSidebar: boolean;
  darkMode: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const [currentView, setCurrentView] = useState<string>("create");

  return (
    <div className="bg-light-secondary dark:bg-dark-secondary p-4 min-h-screen overflow-y-auto w-full">
      {/* Navbar */}
      <div className="flex items-center justify-between">
        {/* Left menu */}
        <div className="flex items-center gap-2">
          {/* Icon when sidebar is close */}
          {!showSidebar && <GiFeather className="text-4xl" />}

          {/* Side menu button */}
          <button
            className="bg-light-primary dark:bg-dark-primary p-2 rounded-md"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <LuPanelLeftOpen
              className={`${
                showSidebar && "-scale-x-100"
              } duration-500 text-xl transition-transform`}
            />
          </button>

          {/* Preview Scribble button */}
          <div
            onClick={() => setCurrentView("preview")}
            className="bg-light-primary dark:bg-dark-primary cursor-pointer flex items-center gap-2 p-2 rounded-md w-fit"
          >
            <VscPreview className="text-xl" />
            <span className="hidden md:block">Preview scribble</span>
          </div>

          {/* Edit Scribble button */}
          <div
            onClick={() => setCurrentView("edit")}
            className="bg-light-primary dark:bg-dark-primary cursor-pointer flex items-center gap-2 p-2 rounded-md w-fit"
          >
            <FaRegEdit className="text-xl" />
            <span className="hidden md:block">Edit scribble</span>
          </div>

          {/* Create new scribble button */}
          <div
            onClick={() => setCurrentView("create")}
            className="bg-light-primary dark:bg-dark-primary cursor-pointer flex items-center gap-2 p-2 rounded-md w-fit"
          >
            <IoMdAddCircleOutline className="text-xl" />
            <span className="hidden md:block">New scribble</span>
          </div>
        </div>

        {/* Right menu */}
        <div className="flex gap-2 sm:gap-4 items-center">
          <span className="bg-light-primary dark:bg-dark-primary p-1 rounded-full">
            <TbBulb
              className={`${darkMode ? "hover:text-yellow-400" : "hover:text-neutral-600"} cursor-pointer text-2xl`}
              onClick={() => setDarkMode(!darkMode)}
            />
          </span>
          <span className="bg-light-primary dark:bg-dark-primary p-1 rounded-full">
            <FaUserCircle className="cursor-pointer text-2xl" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-light-tertiary dark:bg-dark-tertiary mt-4 p-4 rounded-md h-[calc(100vh-90px)] overflow-y-auto">
        {currentView === "preview" && <ScribblePreview />}
        {currentView === "edit" && <ScribbleEdit />}
        {currentView === "create" && <ScribbleCreate />}
      </div>
    </div>
  );
};

export default Main;
