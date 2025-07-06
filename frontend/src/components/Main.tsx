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

// types
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
  const [currentView, setCurrentView] = useState<string>("preview");

  return (
    <div className="bg-lightSurface dark:bg-darkSurface p-4 min-h-screen overflow-y-auto w-full">
      {/* Navbar */}
      <div className="flex items-center justify-between">
        {/* Left nav-menu */}
        <div className="flex items-center gap-2">
          {/* AppLogo - show when sidebar is closed */}
          {!showSidebar && <GiFeather className="text-4xl" />}

          {/* Sidebar toggle button */}
          <button
            className="bg-lightBg hover:bg-lightHover dark:bg-darkBg hover:dark:bg-darkHighlight dark:hover:bg-lightHover p-2 rounded-md"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <LuPanelLeftOpen
              className={`${
                showSidebar && "-scale-x-100"
              } duration-500 text-xl transition-transform`}
            />
          </button>

          {/* Preview scribble button */}
          <div
            onClick={() => setCurrentView("preview")}
            className={`${
              currentView === "preview"
                ? "bg-lightHover dark:bg-darkHighlight"
                : "bg-lightBg dark:bg-darkBg"
            } hover:bg-lightHover dark:hover:bg-darkHighlight cursor-pointer duration-100 flex items-center gap-2 p-2 rounded-md w-fit`}
          >
            <VscPreview className="text-xl" />
            <span className="hidden md:block">Preview scribble</span>
          </div>

          {/* Edit scribble button */}
          <div
            onClick={() => setCurrentView("edit")}
            className={`${
              currentView === "edit"
                ? "bg-lightHover dark:bg-darkHighlight"
                : "bg-lightBg dark:bg-darkBg"
            } hover:bg-lightHover dark:hover:bg-darkHighlight cursor-pointer duration-100 flex items-center gap-2 p-2 rounded-md w-fit`}
          >
            <FaRegEdit className="text-xl" />
            <span className="hidden md:block">Edit scribble</span>
          </div>

          {/* Create new scribble button */}
          <div
            onClick={() => setCurrentView("create")}
            className={`${
              currentView === "create"
                ? "bg-lightHover dark:bg-darkHighlight"
                : "bg-lightBg dark:bg-darkBg"
            } hover:bg-lightHover dark:hover:bg-darkHighlight cursor-pointer duration-100 flex items-center gap-2 p-2 rounded-md w-fit`}
          >
            <IoMdAddCircleOutline className="text-xl" />
            <span className="hidden md:block">New scribble</span>
          </div>
        </div>

        {/* Right nav-menu */}
        <div className="flex gap-2 sm:gap-4 items-center">
          {/* Dark/light mode button */}
          <span className="bg-lightBg dark:bg-darkBg p-1 rounded-full">
            <TbBulb
              className={`${
                darkMode ? "hover:text-yellow-400" : "hover:text-neutral-600"
              } cursor-pointer text-2xl`}
              onClick={() => setDarkMode(!darkMode)}
            />
          </span>
          {/* User profile button */}
          <span className="bg-lightBg dark:bg-darkBg p-1 rounded-full">
            <FaUserCircle className="cursor-pointer text-2xl" />
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-lightHighlight dark:bg-darkHighlight mt-4 p-4 rounded-md h-[calc(100vh-90px)] overflow-y-auto">
        {currentView === "preview" && <ScribblePreview />}
        {currentView === "edit" && <ScribbleEdit />}
        {currentView === "create" && <ScribbleCreate />}
      </div>
    </div>
  );
};

export default Main;
