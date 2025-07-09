import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useScribbles } from "../context/ScribbleContext";

// types
import type { scribbleDataType } from "../utils/types";

const ScribblePreview = () => {
  const { scribbles } = useScribbles();
  const params = useParams();
  const [selectedScribble, setSelectedScribble] = useState<scribbleDataType | undefined>(undefined);

  useEffect(() => {
    const currentScribble = scribbles.find((scribble) => scribble._id === params.id);
    if (currentScribble) {
      setSelectedScribble(currentScribble);
    } else {
      setSelectedScribble(undefined)
    }
  }, [scribbles, params.id]);

  if (!selectedScribble) {
    return (
      <div>
        <p>Please select a scribble !</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">{selectedScribble.title}</h1>
      <span className="bg-bluePrimary px-4 py-1 rounded-md text-white w-fit">
        {selectedScribble.category}
      </span>
      <p className="">{selectedScribble.content}</p>
    </div>
  );
};

export default ScribblePreview;
