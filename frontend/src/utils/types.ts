import type { Dispatch, SetStateAction } from "react";

// USER CONTEXT TYPES

export type UserData = {
  _id: string
  pic: string;
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
}

export type UserContext = {
  userInfo: UserData | null;
  setUserInfo: Dispatch<React.SetStateAction<UserData | null>>;
}

// SCRIBBLE CONTEXT TYPES

export type ScribbleData = {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export type ScribbleContext = {
  isLoading: boolean;
  error: string;
  scribbles: ScribbleData[];
  setScribbles: Dispatch<React.SetStateAction<ScribbleData[]>>;
};

// COMMON COMPONENT TYPES

export type LoaderProps = {
  size?: string;
}

export type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  setDeleteScribbleId: Dispatch<SetStateAction<string>>;
};

export type SidebarCardProps = {
  scribble: ScribbleData;
  setDeleteScribbleId: Dispatch<SetStateAction<string>>;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
};

export type ModalDeleteScribbleProps = {
  deleteScribbleId: string;
  setDeleteScribbleId: Dispatch<SetStateAction<string>>;
}

export type MarkdownGuideModalProps = {
  setShowMarkdownGuideModal: Dispatch<SetStateAction<boolean>>;
}

// AUTH COMPONENT & AUTH PAGE TYPES

export type LoginFormData = {
  email: string;
  password: string;
}

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  pic: string;
};

// SCRIBBLE COMPONENT & SCRIBBLE PAGE TYPES

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

export type ScribbleFormData = {
  title: string;
  content: string;
  category: string;
}

// PROFILE PAGE TYPES

export type ProfileData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  pic: string;
}