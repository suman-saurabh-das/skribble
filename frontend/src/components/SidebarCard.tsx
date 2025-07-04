import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";

// types
import type { noteDataType } from "../utils/types";

const SidebarCard = ({ note }: noteDataType) => {
  return (
    <div className="hover:bg-light-tertiary hover:dark:bg-dark-tertiary hover:cursor-pointer flex items-center justify-between px-3 py-2 rounded-md">
      {/* Scribble title */}
      <div className="w-[80%]">
        <h5 className="truncate">{note.title}</h5>
      </div>
      {/* Buttons */}
      <div className="flex justify-end items-center gap-2 text-lg w-[15%]">
        <button className="hover:text-blue-500">
          <MdOutlineEdit />
        </button>
        <button className="hover:text-red-500">
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default SidebarCard;
