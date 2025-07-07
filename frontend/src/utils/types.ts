export type noteDataType = {
  _id: string;
  title: string;
  content: string;
  category: string;
};

export type SidebarCardProps = {
  note: noteDataType;
}
