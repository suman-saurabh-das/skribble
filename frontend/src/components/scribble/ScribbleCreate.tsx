import axios from "axios";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useScribble } from "../../context/ScribbleContext";
import ReactMarkdown from "react-markdown";
// icons
import { FiInfo } from "react-icons/fi";
// types
import type { ScribbleFormData } from "../../utils/types";

const ScribbleCreate = () => {
  const initialData = {
    title: "",
    content: "",
    category: "",
  };

  const [formData, setFormData] = useState<ScribbleFormData>(initialData);
  const [error, setError] = useState<string>("");

  const { userInfo } = useUser();
  const { scribbles, setScribbles } = useScribble();

  const validateFormData = (formData: ScribbleFormData) => {
    if (!formData.title) {
      setError("Title is required!");
      return false;
    }
    if (!formData.category) {
      setError("Category is required!");
      return false;
    }
    if (!formData.content) {
      setError("Content is required!");
      return false;
    }
    setError("");
    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateScribble = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FORM DATA:", formData);

    if (userInfo && validateFormData(formData)) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const res = await axios.post("/api/scribbles/create", formData, config);
        setScribbles([...scribbles, res.data]);
      } catch (error) {
        console.error("Failed to create scribble:", error);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-16 sm:gap-8">
      {/* Create scribble form */}
      <div className="sm:w-1/2">
        <form className="flex flex-col gap-4" action="">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="title">
              Scribble title
            </label>
            <input
              className="bg-lightHighlight dark:bg-darkHighlight dark:bg- border border-lightSurface dark:border-darkSurface outline-none px-4 py-2 rounded-md"
              name="title"
              onChange={(e) => handleInputChange(e)}
              onFocus={() => setError("")}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="category">
              Scribble category
            </label>
            <input
              className="bg-lightHighlight dark:bg-darkHighlight dark:bg- border border-lightSurface dark:border-darkSurface outline-none px-4 py-2 rounded-md"
              name="category"
              onChange={(e) => handleInputChange(e)}
              onFocus={() => setError("")}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="content">
              Scribble content
            </label>
            <textarea
              className="bg-lightHighlight dark:bg-darkHighlight dark:bg- border border-lightSurface dark:border-darkSurface outline-none px-4 py-2 rounded-md min-h-80"
              name="content"
              onChange={(e) => handleInputChange(e)}
              onFocus={() => setError("")}
            />
          </div>
          {error && (
            <p className="flex gap-1 items-start text-red-500">
              <FiInfo className="flex-shrink-0 mt-[3px]" /> {error}
            </p>
          )}
          <button
            className="bg-lightSurface hover:bg-lightBg dark:bg-darkSurface hover:dark:bg-darkBg cursor-pointer px-3 py-2 rounded-md"
            type="submit"
            onClick={handleCreateScribble}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Live preview */}
      <div className="sm:w-1/2">
        {/* 
          In order to allow the markdown syntax to provide the styles prevent tailwind.css from overwriting it, I have installed a package called @tailwindcss/typography
          This package provides a prose class, which removes the tailwind styles
        */}
        <div className="prose dark:prose-invert h-[calc(100vh-122px)] overflow-y-scroll pr-2 max-w-none w-full">
          <ReactMarkdown>{formData.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ScribbleCreate;
