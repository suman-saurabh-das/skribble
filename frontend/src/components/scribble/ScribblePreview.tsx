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
      <div className="font-shantel-sans text-base text-center">
        <p>Please select a scribble to preview!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">{selectedScribble.title}</h1>
        <span className="bg-lightBg dark:bg-darkBg px-4 py-2 rounded-md dark:text-white w-fit">
          {selectedScribble.category}
        </span>
      </div>
      <hr />
      {/* 
        In order to allow the markdown syntax to provide the styles prevent tailwind.css from overwriting it, I have installed a package called @tailwindcss/typography.
        This package provides a prose class, which removes the tailwind styles.
      */}
      <div className="prose dark:prose-invert overflow-y-scroll pr-2 max-w-none w-full [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:overflow-x-auto">
        <ReactMarkdown>{selectedScribble.content}</ReactMarkdown>
      </div>
      <hr />
      <div className="flex flex-col gap-2 text-sm text-neutral-500">
        <p>Updated on: {new Date(selectedScribble.updatedAt).toLocaleString()}</p>
        <p>Created on: {new Date(selectedScribble.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ScribblePreview;
