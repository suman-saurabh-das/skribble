import { FiSearch } from "react-icons/fi";
import { GiFeather } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";

// components
import SidebarCard from "./SidebarCard";

// types
import type { Dispatch, SetStateAction } from "react";

// sample data
import notesData from "../../data/notes.json";

const Sidebar = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`${
        showSidebar ? "translate-x-0" : "-translate-x-80"
      } absolute top-0 left-0 bg-lightBg dark:bg-darkBg transform transition-transform flex flex-col gap-4 min-h-screen overflow-y-auto w-80 duration-300 z-50`}
    >
      <div className="p-4">
        {/* App header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* App logo */}
            <h3 className="font-shantel-sans text-4xl">Skribble</h3>
            <GiFeather className="text-4xl" />
          </div>

          {/* Close sidebar button (Only for small devices) */}
          <span
            className="xl:hidden"
            onClick={() => {
              setShowSidebar(false);
            }}
          >
            <IoIosCloseCircleOutline className="text-3xl" />
          </span>
        </div>

        {/* Side menu */}
        <div
          className={`${
            notesData.notes.length > 0 && "gap-4 pb-4"
          } bg-lightSurface dark:bg-darkSurface flex flex-col rounded-md`}
        >
          {/* Searchbar */}
          <div className="flex bg-lightHighlight dark:bg-darkHighlight rounded-md w-full">
            <input
              className="bg-transparent outline-none py-3 px-4 placeholder:text-neutral-900 dark:placeholder:text-neutral-400 w-[85%]"
              placeholder="Search"
              type="text"
            />
            <div className="flex items-center justify-center text-xl text-neutral-900 dark:text-neutral-400 w-[15%]">
              <FiSearch />
            </div>
          </div>

          {/* Sidebar cards */}
          <div className="flex flex-col gap-2 px-2 h-[calc(100vh-168px)] overflow-y-auto">
            {notesData.notes.map((note) => (
              <SidebarCard key={note._id} note={note} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
