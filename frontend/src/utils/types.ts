import type { Dispatch, SetStateAction } from "react";

export type scribbleDataType = {
  _id: string;
  title: string;
  content: string;
  category: string;
};

export type ScribbleContextType = {
  scribbles: scribbleDataType[];
  setScribbles: Dispatch<React.SetStateAction<scribbleDataType[]>>;
}

export type ScribblesProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export type MainProps = {
  showSidebar: boolean;
  darkMode: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
};

export type SidebarCardProps = {
  scribble: scribbleDataType;
};
