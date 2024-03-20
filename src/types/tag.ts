import { FormEvent } from "react";

export type TagData = {
  tagId: number;
  tagContent: string;
};

export interface TagDatas {
  priceList: TagData[];
  familyList: TagData[];
  themeList: TagData[];
  seasonList: TagData[];
}

export type TagCheckList = {
  priceList: number[];
  familyList: number[];
  themeList: number[];
  seasonList: number[];
};

export interface DropdownProps {
  list: TagData[];
  key: string;
}

export type TagBtnProps = {
  list: TagData[];
  tagStyle?: string;
  tagFor?: string;
  handleCheck?: (checked: boolean, type: string, id: number) => void;
  checkList: number[];
};

export interface TagBtnGroupProps {
  name: string;
  handleCheck: (checked: boolean, tagFor: string, tagId: number) => void;
  handleSubmit: (e: FormEvent) => void;
  tagCheckList: TagCheckList;
  handleResetTags: () => void;
}
