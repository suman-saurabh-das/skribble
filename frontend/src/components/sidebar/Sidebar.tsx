import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScribble } from "../../context/ScribbleContext";
// components
import Loader from "../common/Loader";
import SidebarCard from "./SidebarCard";
// icons
import { FiSearch } from "react-icons/fi";
import { GiFeather } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { GoSidebarExpand } from "react-icons/go";
// types
import type { SidebarProps, ScribbleData } from "../../utils/types";

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  setDeleteScribbleId,
}: SidebarProps) => {
  const { scribbles, isLoading } = useScribble();

  const [searchText, setSearchText] = useState<string>("");
  const [filteredScribbles, setFilteredScribbles] = useState<ScribbleData[]>(
    []
  );

  const handleFilterScribbles = () => {
    if (searchText !== "") {
      const updatedScribbles = scribbles.filter((scribble) =>
        scribble.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredScribbles(updatedScribbles);
    } else {
      setFilteredScribbles(scribbles);
    }
  };

  useEffect(() => {
    // Initialize filteredScribbles with scribbles data
    if (scribbles) {
      setFilteredScribbles(scribbles);
    }
    // Update filteredScribbles whenever user types in search
    handleFilterScribbles();
  }, [scribbles, searchText]);

  return (
    <div
      className={`${
        showSidebar ? "translate-x-0" : "-translate-x-80"
      } absolute top-0 left-0 bg-lightBg dark:bg-darkBg transform transition-transform flex flex-col gap-4 min-h-screen overflow-y-auto w-80 duration-300 z-40`}
    >
      <div className="p-4">
        {/* App header */}
        <div className="flex items-center justify-between mb-4">
          <Link to={"/skribble"} className="flex items-center gap-2">
            {/* App logo */}
            <h3 className="font-shantel-sans text-4xl">Skribble</h3>
            <GiFeather className="text-4xl" />
          </Link>

          {/* Close sidebar button (Only for small devices) */}
          <span
            className="cursor-pointer xl:hidden"
            onClick={() => {
              setShowSidebar(false);
            }}
          >
            <GoSidebarExpand className="text-2xl" />
          </span>
        </div>

        {/* Side menu */}
        <div
          className={`${
            scribbles.length > 0 && "gap-4 pb-4"
          } bg-lightSurface dark:bg-darkSurface flex flex-col h-[calc(100vh-88px)] rounded-md`}
        >
          {/* Searchbar */}
          <div className="flex bg-lightHighlight dark:bg-darkHighlight rounded-md w-full">
            <input
              className="bg-transparent outline-none py-3 px-4 placeholder:text-neutral-900 dark:placeholder:text-neutral-400 w-[85%]"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              placeholder="Search"
              type="text"
              value={searchText}
            />
            <button
              className="flex items-center justify-center text-xl text-neutral-900 dark:text-neutral-400 w-[15%]"
              onClick={() => setSearchText("")}
            >
              {searchText === "" ? <FiSearch /> : <IoClose />}
            </button>
          </div>

          {/* Sidebar cards */}
          <div className="flex flex-col gap-2 px-2 overflow-y-auto">
            {isLoading ? (
              <div className="my-6">
                <Loader size="text-2xl" />
              </div>
            ) : (
              filteredScribbles.map((scribble) => (
                <SidebarCard
                  key={scribble._id}
                  scribble={scribble}
                  setDeleteScribbleId={setDeleteScribbleId}
                  setShowSidebar={setShowSidebar}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
