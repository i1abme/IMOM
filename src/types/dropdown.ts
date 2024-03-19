export type FilterDropdownProps<T> = {
  list: T[];
  id: string;
  handleClick: (value: string, id: string) => void;
  label?: string;
  selected?: string | null;
  divStyle?: string;
  labeStyle?: string;
  selectStyle?: string;
  optionStyle?: string;
  listId?: string;
  listContent?: string;
};

export type PackageDropdownProps = {
  handleClick: (value: string, id: string, packageName?: string) => void;
  label?: string;
  divStyle?: string;
  labeStyle?: string;
  selectStyle?: string;
  optionStyle?: string;
  listId?: string;
  listContent?: string;
  selected?: string;
};
