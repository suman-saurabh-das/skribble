import { Link } from "react-router-dom";
// icons
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
// types
import type { SidebarCardProps } from "../../utils/types";

const SidebarCard = ({ scribble, setDeleteScribbleId }: SidebarCardProps) => {
  return (
    <div className="hover:bg-lightHighlight hover:dark:bg-darkHighlight hover:cursor-pointer flex items-center justify-between px-3 rounded-md">
      {/* SidebarCard title */}
      <Link to={`/skribble/preview/${scribble._id}`} className="py-2 w-[80%]">
        <h5 className="truncate">{scribble.title}</h5>
      </Link>
      {/* SidebarCard buttons */}
      <div className="flex justify-end items-center gap-2 text-lg w-[15%]">
        <Link
          to={`/skribble/edit/${scribble._id}`}
          className="py-2 hover:text-bluePrimary"
        >
          <MdOutlineEdit />
        </Link>
        <button
          onClick={() => setDeleteScribbleId(scribble._id)}
          className="py-2 hover:text-red-500"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default SidebarCard;
