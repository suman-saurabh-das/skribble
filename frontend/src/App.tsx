import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import Auth from "./pages/Auth";
import Scribbles from "./pages/Scribble";
// components
import ScribbleCreate from "./components/scribble/ScribbleCreate";
import ScribblePreview from "./components/scribble/ScribblePreview";
import ScribbleEdit from "./components/scribble/ScribbleEdit";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className={`${darkMode ? "dark" : ""} bg-white font-open-sans text-sm w-full`}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="skribble"
            element={<Scribbles darkMode={darkMode} setDarkMode={setDarkMode} />}
          >
            <Route index element={<ScribblePreview />} />
            <Route path="create" element={<ScribbleCreate />} />
            <Route path="preview/:id" element={<ScribblePreview />} />
            <Route path="edit/:id" element={<ScribbleEdit />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
