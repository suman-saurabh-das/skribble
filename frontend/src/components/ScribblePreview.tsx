import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// types
import type { noteDataType } from "../utils/types";

// sample data
import notesData from "../../data/notes.json";

const ScribblePreview = () => {
  const [selectedNote, setSelectedNote] = useState<noteDataType | undefined>(
    undefined
  );
  const params = useParams();

  useEffect(() => {
    const currentNote = notesData.notes.find((note) => note._id === params.id);
    setSelectedNote(currentNote);
  }, [params.id]);

  if (!selectedNote) {
    return (
      <div>
        <p>Please select a scribble !</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">{selectedNote.title}</h1>
      <span className="bg-bluePrimary px-4 py-1 rounded-md text-white w-fit">{selectedNote.category}</span>
      <p className="">{selectedNote.content}</p>
    </div>
  );
};

export default ScribblePreview;
