import { useRef } from "react";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
// components
import MarkdownGuideModal from "../common/MarkdownGuideModal";
// icons
import { GiFeather } from "react-icons/gi";
import { GoSidebarExpand } from "react-icons/go";
import { VscNewFile, VscOpenPreview } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { TbBulb, TbHelp  } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
// types
import type { ScribbleContainerProps } from "../../utils/types";

const ScribbleContainer = ({
  darkMode,
  setDarkMode,
  showSidebar,
  setShowSidebar,
}: ScribbleContainerProps) => {
  const [scribbleId, setScribbleId] = useState<string | undefined>(undefined);
  const [showDropdown, setShowDropDown] = useState<boolean>(false);
  const [showMarkdownGuideModal, setShowMarkdownGuideModal] =
    useState<boolean>(false);

  const params = useParams();
  const navigate = useNavigate();
  const { setUserInfo } = useUser();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLSpanElement>(null);

  // Hide dropdown when clicked anywhere in the app
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(e.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    // Remove userInfo from local storage & UserContext
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setShowDropDown(false);
    // Navigate user to login/register page, when user logs out!
    navigate("/");
  };

  // useEffect to store the id of currently selected scribble using params
  // scribbleId is used to show/hide the preview & edit buttons and for navigation
  useEffect(() => {
    if (params) {
      setScribbleId(params.id);
    }
  }, [params.id]);

  return (
    <div className="bg-lightSurface dark:bg-darkSurface p-4 min-h-screen overflow-y-auto w-full">
      {/* Navbar */}
      <div className="flex items-center justify-between">
        {/* Left nav-menu */}
        <div className="flex items-center gap-2">
          {/* AppLogo - show when sidebar is closed */}
          {!showSidebar && (
            <Link to={"/skribble"} onClick={() => setShowSidebar(true)}>
              <GiFeather className="text-4xl" />
            </Link>
          )}

          {/* Sidebar toggle button */}
          <button
            className="bg-lightBg hover:bg-lightHover dark:bg-darkBg hover:dark:bg-darkHighlight dark:hover:bg-lightHover p-2 rounded-md"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <GoSidebarExpand
              className={`${
                !showSidebar && "-scale-x-100"
              } duration-500 text-xl transition-transform`}
            />
          </button>

          {/* Create new scribble button */}
          <Link
            to={"/skribble/create"}
            className={`${
              window.location.pathname.includes("create")
                ? "bg-lightHover dark:bg-darkHighlight"
                : "bg-lightBg dark:bg-darkBg"
            } hover:bg-lightHover dark:hover:bg-darkHighlight cursor-pointer duration-100 flex items-center gap-2 p-2 rounded-md w-fit`}
          >
            <VscNewFile className="text-xl" />
            <span className="hidden md:block">New scribble</span>
          </Link>

          {/* Preview scribble button */}
          {scribbleId && (
            <Link
              to={`/skribble/preview/${scribbleId}`}
              className={`${
                window.location.pathname.includes("preview")
                  ? "bg-lightHover dark:bg-darkHighlight"
                  : "bg-lightBg dark:bg-darkBg"
              } hover:bg-lightHover dark:hover:bg-darkHighlight cursor-pointer duration-100 flex items-center gap-2 p-2 rounded-md w-fit`}
            >
              <VscOpenPreview className="text-xl" />
              <span className="hidden md:block">Preview scribble</span>
            </Link>
          )}

          {/* Edit scribble button */}
          {scribbleId && (
            <Link
              to={`/skribble/edit/${scribbleId}`}
              className={`${
                window.location.pathname.includes("edit")
                  ? "bg-lightHover dark:bg-darkHighlight"
                  : "bg-lightBg dark:bg-darkBg"
              } hover:bg-lightHover dark:hover:bg-darkHighlight cursor-pointer duration-100 flex items-center gap-2 p-2 rounded-md w-fit`}
            >
              <CiEdit className="text-xl" />
              <span className="hidden md:block">Edit scribble</span>
            </Link>
          )}
        </div>

        {/* Right nav-menu */}
        <div className="flex gap-2 sm:gap-4 items-center relative">
          {/* Dark/light mode button */}
          <button className="bg-lightBg dark:bg-darkBg p-1 rounded-full text-neutral-600">
            <TbBulb
              className={`${
                darkMode ? "dark:hover:text-yellow-400" : "hover:text-neutral-800"
              } cursor-pointer dark:text-white text-2xl`}
              onClick={() => setDarkMode(!darkMode)}
            />
          </button>

          <button
            className="bg-lightBg dark:bg-darkBg p-1 rounded-full"
            onClick={() => setShowMarkdownGuideModal(true)}
          >
            <TbHelp className="cursor-pointer text-2xl" />{" "}
          </button>

          {/* User profile button */}
          <span
            className="bg-lightBg dark:bg-darkBg p-1 rounded-full"
            onClick={() => setShowDropDown(!showDropdown)}
            ref={profileButtonRef}
          >
            <FaUserCircle className="cursor-pointer text-2xl" />
          </span>

          {/* Profile menu */}
          {showDropdown && (
            <div
              className="absolute top-14 right-2 bg-lightBg hover:bg-lightSurface dark:bg-darkSurface hover:dark:bg-darkBg cursor-pointer px-3 py-2 rounded-md"
              onClick={handleLogout}
              ref={dropdownRef}
            >
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* ScribbleContainer Content */}
      <div className="bg-lightHighlight dark:bg-darkHighlight mt-4 p-4 rounded-md h-[calc(100vh-85px)] overflow-y-auto">
        <Outlet />
      </div>

      {showMarkdownGuideModal && (
        <MarkdownGuideModal
          setShowMarkdownGuideModal={setShowMarkdownGuideModal}
        />
      )}
    </div>
  );
};

export default ScribbleContainer;
