import type { Dispatch, SetStateAction } from "react";

export type userDataType = {
  _id: string
  pic: string;
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
}

export type scribbleDataType = {
  _id: string;
  title: string;
  content: string;
  category: string;
};

export type loginFormData = {
  email: string;
  password: string;
}

export type registerFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic: string;
};

export type UserContextType = {
  userInfo: userDataType | null;
  setUserInfo: Dispatch<React.SetStateAction<userDataType | null>>;
}

export type ScribbleContextType = {
  scribbles: scribbleDataType[];
  setScribbles: Dispatch<React.SetStateAction<scribbleDataType[]>>;
};

export type ScribblePageProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export type ScribbleContainerProps = {
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
