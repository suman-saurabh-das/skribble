import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Scribbles from "./pages/Scribbles";

// components
import ScribbleCreate from "./components/ScribbleCreate";
import ScribblePreview from "./components/ScribblePreview";
import ScribbleEdit from "./components/ScribbleEdit";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className={`${darkMode ? "dark" : ""} font-open-sans text-sm`}>
        <Routes>
          <Route path="/" element={<Login />} />
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
