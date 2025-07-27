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
        axios.delete(`/api/scribbles/delete/${deleteScribbleId}`, config);
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
    <div className="absolute bg-black/80 h-screen w-full z-[100]">
      {/* Modal */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-lightHighlight dark:bg-darkSurface flex flex-col gap-4 px-10 py-8 rounded-lg text-black dark:text-white">
        <button
          className="relative -top-5 left-[98%] p-1 text-2xl w-fit"
          onClick={() => setDeleteScribbleId("")}
        >
          <IoClose />
        </button>
        <h4 className="font-medium">
          Are you sure you want to delete this scribble ?
        </h4>
        <div className="flex gap-4 mt-4">
          <button
            className="border border-lightBg hover:border-red-800 hover:bg-red-700 duration-300 font-semibold px-6 py-2 rounded-md text-red-700 dark:text-white hover:text-white transition-all w-24"
            onClick={handleDeleteScribble}
          >
            Yes
          </button>
          <button
            className="border border-lightBg hover:border-red-800 hover:bg-red-700 duration-300 font-semibold px-6 py-2 rounded-md text-red-700 dark:text-white hover:text-white transition-all w-24"
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
