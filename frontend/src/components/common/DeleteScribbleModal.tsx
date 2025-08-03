import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useScribble } from "../../context/ScribbleContext";
// icons
import { IoClose } from "react-icons/io5";
// types
import type { ModalDeleteScribbleProps } from "../../utils/types";

const DeleteScribbleModal = ({
  deleteScribbleId,
  setDeleteScribbleId,
}: ModalDeleteScribbleProps) => {
  const { userInfo } = useUser();
  const { scribbles, setScribbles } = useScribble();

  const handleDeleteScribble = async () => {
    if (userInfo) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        axios.delete(`https://skribble-api.onrender.com/api/scribbles/delete/${deleteScribbleId}`, config);
        const updatedScribbles = scribbles.filter(
          (scribble) => scribble._id !== deleteScribbleId
        );
        setScribbles(updatedScribbles);
        setDeleteScribbleId("");
      } catch (error) {
        console.error("Failed to create scribble:", error);
      }
    }
  };

  return (
    // Modal overlay
    <div className="absolute bg-black/80 h-screen w-full z-50">
      {/* Modal */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-lightHighlight dark:bg-darkSurface flex flex-col px-10 py-8 rounded-lg text-black dark:text-white">
        <button
          className="relative -top-5 left-[98%] p-1 text-2xl w-fit"
          onClick={() => setDeleteScribbleId("")}
        >
          <IoClose />
        </button>
        <h4 className="font-medium">
          Are you sure you want to delete this scribble ?
        </h4>
        <div className="flex gap-4 mt-8">
          <button
            className="bg-red-600 hover:bg-red-700 border border-red-700 duration-300 font-semibold px-6 py-2 rounded-md text-white transition-all w-24"
            onClick={handleDeleteScribble}
          >
            Yes
          </button>
          <button
            className="bg-lightSurface hover:bg-lightHover dark:bg-darkBg dark:hover:bg-[#080B10] duration-300 font-semibold px-6 py-2 rounded-md text-black dark:text-white transition-all w-24"
            onClick={() => setDeleteScribbleId("")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteScribbleModal;
