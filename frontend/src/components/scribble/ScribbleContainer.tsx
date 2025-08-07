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
import { CiEdit, CiUser, CiLogout } from "react-icons/ci";
import { TbBulb } from "react-icons/tb";
import { IoHelpCircleOutline } from "react-icons/io5";
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
  const { userInfo, setUserInfo } = useUser();

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
    <div className="bg-lightSurface dark:bg-darkSurface p-3 h-screen overflow-y-auto w-full">
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
            } hover:bg-lightHover dark:hover:bg-darkHighlight cursor-pointer duration-100 flex items-center gap-2 px-2 py-[6px] rounded-md w-fit`}
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
              } hover:bg-lightHover dark:hover:bg-darkHighlight cursor-pointer duration-100 flex items-center gap-2 px-2 py-[6px] rounded-md w-fit`}
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
              } hover:bg-lightHover dark:hover:bg-darkHighlight cursor-pointer duration-100 flex items-center gap-2 px-2 py-[6px] rounded-md w-fit`}
            >
              <CiEdit className="text-xl" />
              <span className="hidden md:block">Edit scribble</span>
            </Link>
          )}
        </div>

        {/* Right nav-menu */}
        <div className="flex gap-2 sm:gap-3 items-center relative">
          {/* Dark/light mode button */}
          <button className="bg-lightBg dark:bg-darkBg p-1 rounded-full text-neutral-700 hover:text-neutral-900 dark:text-white">
            <TbBulb
              className="cursor-pointer hover:text-neutral-800 dark:hover:text-yellow-400 text-2xl"
              onClick={() => setDarkMode(!darkMode)}
            />
          </button>

          <button
            className="bg-lightBg dark:bg-darkBg p-[2px] rounded-full text-neutral-700 hover:text-neutral-900 dark:text-white"
            onClick={() => setShowMarkdownGuideModal(true)}
          >
            <IoHelpCircleOutline className="cursor-pointer text-3xl" />{" "}
          </button>

          {/* User profile button */}
          <span
            className="bg-lightBg dark:bg-darkBg p-1 rounded-full"
            onClick={() => setShowDropDown(!showDropdown)}
            ref={profileButtonRef}
          >
            <img
              className="cursor-pointer rounded-full h-[28px] w-[28px]"
              src={userInfo?.pic || "/user-profile.webp"}
              alt={userInfo?.name}
            />
          </span>

          {/* Profile menu */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-[62px] right-3 bg-lightBg flex flex-col rounded-lg w-40"
            >
              <Link
                className="bg-lightBg hover:bg-lightSurface dark:bg-darkSurface hover:dark:bg-darkBg cursor-pointer flex gap-2 items-center px-3 py-2 rounded-t-md"
                to={"/profile"}
              >
                <CiUser className="text-2xl" /> Your Profile
              </Link>
              <hr />
              <span
                className="bg-lightBg hover:bg-lightSurface dark:bg-darkSurface hover:dark:bg-darkBg cursor-pointer flex gap-2 items-center px-3 py-2 rounded-b-md"
                onClick={handleLogout}
              >
                <CiLogout className="text-2xl" /> Logout
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ScribbleContainer Content */}
      <div className="bg-lightHighlight dark:bg-darkHighlight mt-3 p-3 rounded-md h-[calc(100vh-77px)] overflow-y-auto">
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
