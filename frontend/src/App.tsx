import { useState } from "react";

// components
import Notes from "./pages/Notes";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className={`${darkMode ? "dark" : ""} font-open-sans text-sm`}>
      <Notes darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
