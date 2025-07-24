import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useScribble } from "../../context/ScribbleContext";
import ReactMarkdown from "react-markdown";
// types
import type { ScribbleData } from "../../utils/types";

const ScribblePreview = () => {
  const [selectedScribble, setSelectedScribble] = useState<
    ScribbleData | undefined
  >(undefined);

  const params = useParams();
  const { scribbles } = useScribble();

  // Currently selected scribble from list of all scribbles
  useEffect(() => {
    const currentScribble = scribbles.find(
      (scribble) => scribble._id === params.id
    );
    if (currentScribble) {
      setSelectedScribble(currentScribble);
    } else {
      setSelectedScribble(undefined);
    }
  }, [scribbles, params.id]);

  // If no scribble is selected, display fallback UI
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
      {/* 
        In order to allow the markdown syntax to provide the styles prevent tailwind.css from overwriting it, I have installed a package called @tailwindcss/typography.
        This package provides a prose class, which removes the tailwind styles.
      */}
      <div className="prose dark:prose-invert overflow-y-scroll pr-2 max-w-none w-full">
        <ReactMarkdown>{selectedScribble.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ScribblePreview;
